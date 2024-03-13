import BlogSideCard from "./BlogSideCard.jsx";
import BlogMainCard from "./BlogMainCard.jsx";
import ScrollUpIcon from "../../assets/icons/scroll-up.png";
import useAxios from "../../hooks/useAxios.js";
import { useBlog } from "../../hooks/useBlog.js";
import { actions } from "../../actions/index.js";

export default function BlogLists({
    blogs,
    popularBlogs,
    favouriteBlogs,
    showEndMessage,
    handleGoTop,
}) {
    const { api } = useAxios();
    const { dispatch } = useBlog();

    async function handleDelete(blogId) {
        dispatch({ type: actions.blog.DATA_FETCHING });
        try {
            const response = await api.delete(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`,
            );
            if (response.status === 200) {
                dispatch({
                    type: actions.blog.POST_DELETED,
                    data: blogId,
                });
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    }

    return (
        <>
            <main>
                <section>
                    <div className="container">
                        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                            <div className="space-y-3 md:col-span-5">
                                {blogs.map((blog, index) => (
                                    <BlogMainCard
                                        blog={blog}
                                        key={blog?.id || index}
                                        onDelete={handleDelete}
                                    />
                                ))}
                                {showEndMessage && (
                                    <div className="py-2 px-4 rounded mt-4 flex justify-center items-center">
                                        <p className="text-white-800 font-bold text-lg mr-4">
                                            Blog ended.
                                        </p>
                                        <button
                                            className="flex items-center"
                                            onClick={handleGoTop}
                                        >
                                            <p className="text-white-800 font-bold text-lg">
                                                Go to top
                                            </p>
                                            <img
                                                src={ScrollUpIcon}
                                                alt=""
                                                className="ml-2"
                                            />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <BlogSideCard
                                blogs={popularBlogs}
                                favouriteBlogs={favouriteBlogs}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}