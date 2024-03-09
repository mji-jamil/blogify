import { Link } from "react-router-dom";
import ThreeDotsIcon from "../../assets/icons/3dots.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";

export default function BlogMainCard({ blog, index, toggleModal, showModals }) {
    return (
        <>
            <div className="blog-card">
                <img
                    className="blog-thumb"
                    src={`${
                        import.meta.env.VITE_SERVER_BASE_URL
                    }/uploads/blog/${blog.thumbnail}`}
                    alt="Thumbnail"
                />
                <div className="mt-2 relative">
                    <Link to="/singleBlog">
                        <h3 className="text-slate-300 text-xl lg:text-2xl">
                            <Link to="/singleBlog">{blog.title}</Link>
                        </h3>
                    </Link>
                    <p className="mb-6 text-base text-slate-500 mt-1">
                        {blog.content}
                    </p>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center capitalize space-x-2">
                            <div className="avater-img bg-indigo-600 text-white">
                                <img
                                    className="blog-thumb"
                                    src={`${
                                        import.meta.env.VITE_SERVER_BASE_URL
                                    }/uploads/avatar/${blog.author.avatar}`}
                                    alt="avatar"
                                />
                            </div>

                            <div>
                                <h5 className="text-slate-500 text-sm">
                                    <Link to="/me">
                                        {blog.author.firstName}{" "}
                                        {blog.author.lastName}
                                    </Link>
                                </h5>
                                <div className="flex items-center text-xs text-slate-700">
                                    <span>{blog.createdAt}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-sm px-2 py-1 text-slate-700">
                            <span>{blog.likes.length} likes</span>
                        </div>
                    </div>

                    <div className="absolute right-0 top-0">
                        <button onClick={() => toggleModal(index)}>
                            <img src={ThreeDotsIcon} alt="3dots of Action" />
                        </button>

                        {showModals[index] && (
                            <div className="action-modal-container">
                                <button className="action-menu-item hover:text-lwsGreen">
                                    <img src={EditIcon} alt="Edit" />
                                    Edit
                                </button>
                                <button className="action-menu-item hover:text-red-500">
                                    <img src={DeleteIcon} alt="Delete" />
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}