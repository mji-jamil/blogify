import { Link } from "react-router-dom";
import ThreeDotsIcon from "../../assets/icons/3dots.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import { useAuth } from "../../hooks/useAuth.js";
import { useState } from "react";

export default function BlogMainCard({ blog, onDelete }) {
    const [showModal, setShowModal] = useState(false);
    const { auth } = useAuth();

    function formatDate(dateString) {
        const date = new Date(dateString);

        const options = { day: "numeric", month: "long", year: "numeric" };
        return date.toLocaleDateString("en-GB", options);
    }

    const handleDeleteClick = () => {
        const shouldDelete = window.confirm(
            "Are you sure you want to delete this blog?",
        );
        if (shouldDelete) {
            onDelete(blog?.id);
        }
    };

    return (
        <>
            <div className="blog-card">
                <Link to={`/blog/${blog.id}`}>
                    <img
                        className="blog-thumb"
                        src={`${
                            import.meta.env.VITE_SERVER_BASE_URL
                        }/uploads/blog/${blog?.thumbnail}`}
                        alt="Thumbnail"
                    />
                </Link>
                <div className="mt-2 relative">
                    <Link to={`/blog/${blog.id}`}>
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
                                        import.meta.env.VITE_SERVER_BASE_URL
                                    }/uploads/avatar/${blog?.author?.avatar}`}
                                    alt="avatar"
                                    className="rounded-full"
                                />
                            </div>

                            <div>
                                <Link to="/me">
                                    <h5 className="text-slate-500 text-sm">
                                        {blog?.author?.firstName}{" "}
                                        {blog?.author?.lastName}
                                    </h5>
                                </Link>
                                <div className="flex items-center text-xs text-slate-700">
                                    <span>{formatDate(blog.createdAt)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-sm px-2 py-1 text-slate-700">
                            <span>{blog?.likes?.length} likes</span>
                        </div>
                    </div>

                    {auth?.user?.id === blog?.author?.id && (
                        <div className="absolute right-0 top-0">
                            <button onClick={(e) => setShowModal(!showModal)}>
                                <img
                                    src={ThreeDotsIcon}
                                    alt="3dots of Action"
                                />
                            </button>

                            {showModal && (
                                <div className="action-modal-container">
                                    <Link to={`/blog/edit/${blog.id}`}>
                                        <button className="action-menu-item hover:text-lwsGreen">
                                            <img src={EditIcon} alt="Edit" />
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        className="action-menu-item hover:text-red-500"
                                        // onClick={() => onDelete(blog?.id)}
                                        onClick={handleDeleteClick}
                                    >
                                        <img src={DeleteIcon} alt="Delete" />
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}