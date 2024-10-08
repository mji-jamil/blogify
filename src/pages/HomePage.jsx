import { useContext, useEffect, useRef, useState } from "react";
import { BlogContext } from "../context";
import { actions } from "../actions";
import useAxios from "../hooks/useAxios";
import BlogLists from "../components/posts/BlogLists";
import axios from "axios";

const HomePage = () => {
    const { state, dispatch } = useContext(BlogContext);
    const { api } = useAxios();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef(null);
    const [showEndMessage, setShowEndMessage] = useState(false);
    const limit = 10;

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            // Clearing previous data
            dispatch({
                type: actions.blog.DATA_FETCHED,
                data: { blogs: [] },
            });

            // Fetching popular blogs
            const popularResponse = await api.get(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/popular`,
            );
            dispatch({
                type: actions.blog.DATA_FETCHING_POPULAR,
                data: popularResponse.data,
            });

            // Fetching favorite blogs
            const favouritesResponse = await api.get(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`,
            );
            dispatch({
                type: actions.blog.DATA_FETCHED_FAVOURTIE,
                data: favouritesResponse.data,
            });

            // Fetching initial blogs
            const blogsResponse = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_BASE_URL
                }/blogs?page=${page}&limit=${limit}`,
            );
            dispatch({
                type: actions.blog.DATA_FETCHED,
                data: blogsResponse.data,
            });
            setPage(page + 1);
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_BASE_URL
                    }/blogs?page=${page}&limit=${limit}`,
                );

                console.log("Fetched data:", response.data);
                if (response.data.blogs.length === 0) {
                    setHasMore(false);
                    setShowEndMessage(true);
                } else {
                    console.log("Appending data:", response.data);
                    dispatch({
                        type: actions.blog.DATA_APPENDED,
                        data: response.data,
                    });
                    setPage((prevPage) => prevPage + 1);
                }
            } catch (error) {
                console.error("Error fetching more data:", error);
            }
        };

        const onIntersection = (items) => {
            const loaderItem = items[0];
            if (loaderItem.isIntersecting && hasMore) {
                fetchProducts();
            }
        };

        const observer = new IntersectionObserver(onIntersection);
        if (observer && loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        // Cleanup
        return () => {
            if (observer) observer.disconnect();
        };
    }, [hasMore, page, dispatch]);

    const handleGoToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (state?.loading) {
        return <div>Loading data...</div>;
    }

    if (state?.error) {
        return <div>Error: {state?.error?.message}</div>;
    }

    return (
        <>
            <BlogLists
                blogs={state?.blogs}
                popularBlogs={state?.popularBlogs}
                favouriteBlogs={state?.favouriteBlogs}
                showEndMessage={showEndMessage}
                handleGoTop={handleGoToTop}
            />

            {!showEndMessage && (
                <div ref={loaderRef}>Loading more blogs...</div>
            )}
        </>
    );
};

export default HomePage;