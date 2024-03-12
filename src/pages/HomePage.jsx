import useAxios from "../hooks/useAxios.js";
import { useContext, useEffect } from "react";
import { actions } from "../actions/index.js";
import BlogLists from "../components/posts/BlogLists.jsx";
import { BlogContext } from "../context/index.js";
import NewBlog from "../components/posts/NewBlog.jsx";
import { useAuth } from "../hooks/useAuth.js";

const HomePage = () => {
    const { state, dispatch } = useContext(BlogContext);
    const { api } = useAxios();
    const { auth } = useAuth();

    useEffect(() => {
        dispatch({ type: actions.blog.DATA_FETCHING });
        const fetchPost = async () => {
            try {
                const [allResponse, popularResponse, favouritesResponse] =
                    await Promise.all([
                        api.get(
                            `${import.meta.env.VITE_SERVER_BASE_URL}/blogs`,
                        ),
                        api.get(
                            `${
                                import.meta.env.VITE_SERVER_BASE_URL
                            }/blogs/popular`,
                        ),
                        api.get(
                            `${
                                import.meta.env.VITE_SERVER_BASE_URL
                            }/blogs/favourites`,
                        ),
                    ]);

                if (
                    allResponse.status === 200 &&
                    popularResponse.status === 200 &&
                    favouritesResponse.status === 200
                ) {
                    dispatch({
                        type: actions.blog.DATA_FETCHED,
                        data: allResponse.data,
                    });
                    dispatch({
                        type: actions.blog.DATA_FETCHING_POPULAR,
                        data: popularResponse.data,
                    });

                    dispatch({
                        type: actions.blog.DATA_FETCHED_FAVOURTIE,
                        data: favouritesResponse.data,
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

    // console.log(`Auth: ${auth.user.firstName}`);
    return (
        <>
            <BlogLists
                blogs={state?.blogs}
                popularBlogs={state?.popularBlogs}
                favouriteBlogs={state?.favouriteBlogs}
            />
        </>
    );
};

export default HomePage;