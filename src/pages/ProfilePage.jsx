import { useAuth } from "../hooks/useAuth.js";
import useAxios from "../hooks/useAxios.js";
import { useContext, useEffect } from "react";
import { useProfile } from "../hooks/useProfile.js";
import { actions } from "../actions/index.js";
import ProfileInfo from "../components/profile/ProfileInfo.jsx";
import MyPost from "../components/profile/MyPost.jsx";
import { ProfileContext } from "../context/index.js";

export default function ProfilePage() {
    const { state, dispatch } = useContext(ProfileContext);

    const { api } = useAxios();

    const { auth } = useAuth();

    useEffect(() => {
        dispatch({ type: actions.profile.DATA_FETCHING });
        const fetchProfile = async () => {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
                        auth?.user?.id
                    }`,
                );
                if (response.status === 200) {
                    dispatch({
                        type: actions.profile.USER_DATA_UPDATED,
                        data: response.data.user,
                    });
                    dispatch({
                        type: actions.profile.DATA_FETCHED,
                        data: response.data,
                    });
                }
            } catch (error) {
                console.log(error);
                dispatch({
                    type: actions.profile.DATA_FETCH_ERROR,
                    data: error.message,
                });
            }
        };
        fetchProfile();
    }, []);

    return (
        <>
            <main className="mx-auto max-w-[1020px] py-8">
                <div className="container">
                    <ProfileInfo />
                    <MyPost />
                </div>
            </main>
        </>
    );
}