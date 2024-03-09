import useAxios from "../hooks/useAxios.js";
import { useBlog } from "../hooks/useBlog.js";
import { useContext, useEffect } from "react";
import { actions } from "../actions/index.js";
import BlogLists from "../components/posts/BlogLists.jsx";
import { BlogContext } from "../context/index.js";

const HomePage = () => {
    const { state, dispatch } = useContext(BlogContext);
    const { api } = useAxios();
    useEffect(() => {
        dispatch({ type: actions.blog.DATA_FETCHING });

        const fetchPost = async () => {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs`,
                );
                if (response.status === 200) {
                    dispatch({
                        type: actions.blog.DATA_FETCHED,
                        data: response.data,
                    });
                }
            } catch (error) {
                console.error(error);
                dispatch({
                    type: actions.blog.DATA_FETCH_ERROR,
                    error: error.message,
                });
            }
        };

        fetchPost();
    }, []);

    if (state?.loading) {
        return <div> We are working...</div>;
    }

    if (state?.error) {
        return <div> Error in fetching posts {state?.error?.message}</div>;
    }
    return (
        <>
            <BlogLists blogs={state?.blogs} />
        </>
    );
};

export default HomePage;