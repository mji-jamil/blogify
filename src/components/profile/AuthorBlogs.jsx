import { Link } from "react-router-dom";

export default function AuthorBlogs({ authorData }) {
    function formatDate(dateString) {
        const date = new Date(dateString);

        const options = { day: "numeric", month: "long", year: "numeric" };
        return date.toLocaleDateString("en-GB", options);
    }
    return (
        <>
            <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Author Blogs</h4>
            <div className="my-6 space-y-4">
                {authorData?.blogs.map((blog) => (
                    <div className="blog-card" key={blog?.id}>
                        <img
                            className="blog-thumb"
                            src={`${
                                import.meta.env.VITE_SERVER_BASE_URL
                            }/uploads/blog/${blog?.thumbnail}`}
                            alt="thumbnail"
                        />
                        <div className="mt-2">
                            <Link to={`/blog/${blog?.id}`}>
                                <h3 className="text-slate-300 text-xl lg:text-2xl">
                                    {blog?.title}
                                </h3>
                                <p className="mb-6 text-base text-slate-500 mt-1">
                                    {blog?.content}
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
                                                blog?.author?.avatar
                                            }`}
                                            alt="Thumbnail"
                                            className="rounded-full"
                                        />
                                    </div>

                                    <div>
                                        <h5 className="text-slate-500 text-sm">
                                            {blog?.author?.firstName}{" "}
                                            {blog?.author?.lastName}
                                        </h5>
                                        <div className="flex items-center text-xs text-slate-700">
                                            <span>
                                                {formatDate(blog?.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-sm px-2 py-1 text-slate-700">
                                    <span>{blog?.likes?.length} likes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}