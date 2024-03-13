import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios.js";
import { useAuth } from "../../hooks/useAuth.js";
import LikeIcon from "../../assets/icons/like.svg";
import CommentIcon from "../../assets/icons/comment.svg";
import HeartIcon from "../../assets/icons/heart.svg";
import LikeFillIcon from "../../assets/icons/like-fill.png";

export default function SingleBlog() {
    const [blogData, setBlogData] = useState(null);
    // const [isFavorite, setIsFavorite] = useState(false);
    // const [isLike, setIsLike] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const { id } = useParams();
    const { auth } = useAuth();
    const { api } = useAxios();

    useEffect(() => {
        const getBlogData = async () => {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${id}`,
                );

                setBlogData(response.data);
                const hasLiked = response.data.likes.includes(auth?.user?.id);
                // setIsLike(hasLiked);
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };

        getBlogData();
    }, [id, commentContent, auth?.user?.id]);

    const handleLike = async () => {
        try {
            const response = await api.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${id}/like`,
                { id: auth?.user?.id },
            );

            setBlogData((prevData) => ({
                ...prevData,
                likes: response.data.likes,
            }));
            // setIsLike((prevIsLike) => !prevIsLike);
        } catch (error) {
            console.error("Error liking blog:", error);
        }
    };

    const handleFavorite = async () => {
        try {
            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${
                    blogData.id
                }/favourite`,
                {
                    author: auth?.user,
                    isFavorite: true,
                    id: blogData.id,
                    title: blogData.title,
                    content: blogData.content,
                    thumbnail: blogData.thumbnail,
                    tags: blogData.tags,
                    likes: blogData.likes,
                    comments: blogData.comments,
                    createdAt: blogData.createdAt,
                },
            );

            setBlogData((prevData) => ({
                ...prevData,
                isFavorite: response.data.isFavorite,
            }));
            // setIsFavorite((prevIsFavorite) => !prevIsFavorite);
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    const handleComment = async () => {
        try {
            const response = await api.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${
                    blogData.id
                }/comment`,
                {
                    content: commentContent,
                    author: auth?.user,
                },
            );

            setBlogData((prevData) => ({
                ...prevData,
                comments: [...prevData.comments, response.data],
            }));
            setCommentContent("");
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this comment?",
        );
        if (!confirmDelete) {
            return;
        }
        try {
            await api.delete(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${
                    blogData.id
                }/comment/${commentId}`,
            );
            setBlogData((prevData) => ({
                ...prevData,
                comments: prevData.comments.filter(
                    (comment) => comment.id !== commentId,
                ),
            }));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: "numeric", month: "long", year: "numeric" };
        return date.toLocaleDateString("en-GB", options);
    }

    if (!blogData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <main>
                <section>
                    <div className="container text-center py-8">
                        <h1 className="font-bold text-3xl md:text-5xl">
                            {blogData.title}
                        </h1>
                        <div className="flex justify-center items-center my-4 gap-4">
                            <div className="flex items-center capitalize space-x-2">
                                <div className="avater-img bg-indigo-600 text-white">
                                    <span className="">
                                        <img
                                            src={`${
                                                import.meta.env
                                                    .VITE_SERVER_BASE_URL
                                            }/uploads/avatar/${
                                                blogData?.author?.avatar
                                            }`}
                                            alt="avatar"
                                            className="rounded-full"
                                        />
                                    </span>
                                </div>
                                <Link
                                    to={
                                        auth?.user?.id !== blogData?.author?.id
                                            ? `/author/${blogData?.author?.id}`
                                            : `/me`
                                    }
                                >
                                    <h5 className="text-slate-500 text-sm">
                                        {blogData?.author?.firstName}{" "}
                                        {blogData?.author?.lastName}
                                    </h5>
                                </Link>
                            </div>
                            <span className="text-sm text-slate-700 dot">
                                {formatDate(blogData?.createdAt)}
                            </span>
                            <span className="text-sm text-slate-700 dot">
                                {blogData?.likes?.length} Likes
                            </span>
                        </div>
                        <img
                            className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
                            src={`${
                                import.meta.env.VITE_SERVER_BASE_URL
                            }/uploads/blog/${blogData?.thumbnail}`}
                            alt="Thumbnail"
                        />
                        <ul className="tags">
                            {blogData.tags.split(",").map((tag, index) => (
                                <li key={index}>{tag.trim()}</li>
                            ))}
                        </ul>

                        <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
                            {blogData?.content}
                        </div>
                    </div>
                </section>

                <section id="comments">
                    <div className="mx-auto w-full md:w-10/12 container">
                        <h2 className="text-3xl font-bold my-8">
                            Comments ({blogData?.comments?.length})
                        </h2>
                        {auth?.user ? (
                            <div className="flex items -center space-x-4">
                                <div className="avater-img bg-indigo-600 text-white">
                                    {auth?.user?.avatar ? (
                                        <img
                                            className="max-w-full rounded-full"
                                            src={`${
                                                import.meta.env
                                                    .VITE_SERVER_BASE_URL
                                            }/uploads/avatar/${
                                                auth?.user?.avatar
                                            }`}
                                            alt={auth?.user?.firstName}
                                        />
                                    ) : (
                                        <div className="avater-img bg-indigo-600 text-white">
                                            <span>
                                                {auth?.user?.firstName.charAt(
                                                    0,
                                                )}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="w-full">
                                    <textarea
                                        className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                                        placeholder="Write a comment"
                                        value={commentContent}
                                        onChange={(e) =>
                                            setCommentContent(e.target.value)
                                        }
                                    ></textarea>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                                            onClick={handleComment}
                                        >
                                            Comment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <Link
                                    to="/login"
                                    className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                                >
                                    Log in to comment
                                </Link>
                            </div>
                        )}
                        {blogData?.comments?.map((comment) => (
                            <div
                                className="flex items-start space-x-4 my-8"
                                key={comment?.id}
                            >
                                <div className="avater-img bg-indigo-600 text-white">
                                    {comment?.author?.avatar ? (
                                        <img
                                            className="max-w-full rounded-full"
                                            src={`${
                                                import.meta.env
                                                    .VITE_SERVER_BASE_URL
                                            }/uploads/avatar/${
                                                comment?.author?.avatar
                                            }`}
                                            alt={auth?.user?.firstName}
                                        />
                                    ) : (
                                        <div className="avater-img bg-indigo-600 text-white">
                                            <span>
                                                {comment?.author?.firstName.charAt(
                                                    0,
                                                )}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="w-full">
                                    <h5 className="text-slate -500 font-bold">
                                        {comment?.author?.firstName}{" "}
                                        {comment?.author?.lastName}
                                    </h5>
                                    <p className="text-slate-300">
                                        {comment?.content}
                                    </p>
                                    {comment?.author?.id === auth?.user?.id && (
                                        <button
                                            className="text-red-600"
                                            onClick={() =>
                                                handleDeleteComment(comment.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <div className="floating-action">
                <ul className="floating-action-menus">
                    <li onClick={handleLike}>
                        {/*{isLike ? (*/}
                        <img src={LikeIcon} alt="like" />
                        {/*<img src={LikeFillIcon} alt="like" />*/}
                        {/*) : (*/}
                        {/*    <img src={LikeIcon} alt="like" />*/}
                        {/*)}*/}
                        <span>{blogData?.likes?.length}</span>
                    </li>

                    <li onClick={handleFavorite}>
                        {/*{isFavorite ? (*/}
                        {/*    <img src={HeartFillIcon} alt="Favourite" />*/}
                        {/*) : (*/}
                        <img src={HeartIcon} alt="Favourite" />
                        {/*)}*/}
                    </li>
                    <a href="#comments">
                        <li>
                            <img src={CommentIcon} alt="Comments" />
                            <span>{blogData?.comments?.length}</span>
                        </li>
                    </a>
                </ul>
            </div>
        </>
    );
}