import { Link } from "react-router-dom";

export default function PopularBlogs({ blogs }) {
    return (
        <>
            <div className="sidebar-card">
                <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                    Most Popular 👍️
                </h3>
                {blogs.map((blog) => (
                    <ul className="space-y-5 my-5" key={blog.id}>
                        <li>
                            <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                                <Link to={`/blog/${blog.id}`}>
                                    {blog.title}
                                </Link>
                            </h3>
                            <p className="text-slate-600 text-sm">
                                by{" "}
                                <Link to="me">
                                    {blog.author.firstName}{" "}
                                    {blog.author.lastName}
                                </Link>
                                <span>·</span> {blog.likes.length} Likes
                            </p>
                        </li>
                    </ul>
                ))}
            </div>
        </>
    );
}