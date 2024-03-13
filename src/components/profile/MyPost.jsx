import { useAuth } from "../../hooks/useAuth.js";
import { useContext, useEffect } from "react";
import { actions } from "../../actions/index.js";
import useAxios from "../../hooks/useAxios.js";
import { ProfileContext } from "../../context/index.js";
import { Link } from "react-router-dom";

export default function MyPost() {
    const { state, dispatch } = useContext(ProfileContext);
    const { api } = useAxios();
    const { auth } = useAuth();

    useEffect(() => {
        dispatch({ type: actions.profile.DATA_FETCHING });

        const fetchPost = async () => {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
                        auth.user.id
                    }`,
                );

                if (response.status === 200) {
                    dispatch({
                        type: actions.profile.BLOGS,
                        data: response.data,
                    });
                }
            } catch (error) {
                console.error(error);
                dispatch({
                    type: actions.profile.DATA_FETCH_ERROR,
                    error: error.message,
                });
            }
        };

        fetchPost();
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);

        const options = { day: "numeric", month: "long", year: "numeric" };
        return date.toLocaleDateString("en-GB", options);
    }

    const blogs = state.posts;

    return (
        <>
            {blogs.length !== 0 ? (
                <>
                    {" "}
                    <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">
                        Your Blogs
                    </h4>
                    <div className="my-6 space-y-4">
                        {blogs.map((blog) => (
                            <div className="blog-card" key={blog.id}>
                                <Link to={`/blog/${blog?.id}`}>
                                    <img
                                        className="blog-thumb"
                                        src={`${
                                            import.meta.env.VITE_SERVER_BASE_URL
                                        }/uploads/blog/${blog.thumbnail}`}
                                        alt="thumbnail"
                                    />
                                </Link>
                                <div className="mt-2">
                                    <Link to={`/blog/${blog?.id}`}>
                                        <h3 className="text-slate-300 text-xl lg:text-2xl">
                                            {blog.title}
                                        </h3>
                                        <p className="mb-6 text-base text-slate-500 mt-1">
                                            {blog.content}
                                        </p>
                                    </Link>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center capitalize space-x-2">
                                            <div className="avater-img bg-indigo-600 text-white">
                                                <img
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_SERVER_BASE_URL
                                                    }/uploads/avatar/${
                                                        blog.author.avatar
                                                    }`}
                                                    alt="Thumbnail"
                                                    className="rounded-full"
                                                />
                                            </div>

                                            <div>
                                                <h5 className="text-slate-500 text-sm">
                                                    {blog.author.firstName}{" "}
                                                    {blog.author.lastName}
                                                </h5>
                                                <div className="flex items-center text-xs text-slate-700">
                                                    <span>
                                                        {formatDate(
                                                            blog.createdAt,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-sm px-2 py-1 text-slate-700">
                                            <span>
                                                {blog.likes.length} likes
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex justify-center h-screen">
                    <div className="text-xl">You don't have any blogs!!</div>
                </div>
            )}
        </>
    );
}