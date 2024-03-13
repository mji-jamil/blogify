import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios.js";
import { useProfile } from "../../hooks/useProfile.js";
import { useAuth } from "../../hooks/useAuth.js";
import LikeIcon from "../../assets/icons/like.svg";
import CommentIcon from "../../assets/icons/comment.svg";
import HeartIcon from "../../assets/icons/heart.svg";

export default function SingleBlog() {
    const [blogData, setBlogData] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const { id } = useParams();
    const { state } = useProfile();
    const { auth } = useAuth();
    const { api } = useAxios();
    useEffect(() => {
        const getBlogData = async () => {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${id}`,
                );
                setBlogData(response.data);
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };

        getBlogData();
    }, [id, commentContent]);

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
        } catch (error) {
            console.error("Error liking blog:", error);
        }
    };

    const handleFavorite = async () => {
        console.log(blogData.id);

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

            console.log(response);

            setBlogData((prevData) => ({
                ...prevData,
                isFavorite: response.data.isFavorite,
            }));
            setIsFavorite((prevIsFavorite) => !prevIsFavorite);
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

            console.log(response);

            setBlogData((prevData) => ({
                ...prevData,
                comments: [...prevData.comments, response.data],
            }));
            setCommentContent("");
        } catch (error) {
            console.error("Error posting comment:", error);
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
                                <h5 className="text-slate-500 text-sm">
                                    {blogData?.author?.firstName}{" "}
                                    {blogData?.author?.lastName}
                                </h5>
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
                        <div className="flex items -center space-x-4">
                            <div className="avater-img bg-indigo-600 text-white">
                                <span className="">
                                    <img
                                        src={`${
                                            import.meta.env.VITE_SERVER_BASE_URL
                                        }/uploads/avatar/${auth?.user?.avatar}`}
                                        alt="avatar"
                                        className="rounded-full"
                                    />
                                </span>
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

                        {blogData?.comments?.map((comment) => (
                            <div
                                className="flex items-start space-x-4 my-8"
                                key={comment?.id}
                            >
                                <div className="avater-img bg-orange-600 text-white">
                                    <span className="">
                                        <img
                                            src={`${
                                                import.meta.env
                                                    .VITE_SERVER_BASE_URL
                                            }/uploads/avatar/${
                                                comment?.author?.avatar
                                            }`}
                                            alt="avatar"
                                            className="rounded-full"
                                        />
                                    </span>
                                </div>
                                <div className="w-full">
                                    <h5 className="text-slate -500 font-bold">
                                        {comment?.author?.firstName}{" "}
                                        {comment?.author?.lastName}
                                    </h5>
                                    <p className="text-slate-300">
                                        {comment?.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <div className="floating-action">
                <ul className="floating-action-menus">
                    <li onClick={handleLike}>
                        <img src={LikeIcon} alt="like" />
                        <span>{blogData?.likes?.length}</span>
                    </li>

                    <li onClick={handleFavorite}>
                        <img src={HeartIcon} alt="Favourite" />
                    </li>
                    <a href="#comments">
                        {/*<li>*/}
                        {/*    <img src={CommentIcon} alt="Comments" />*/}
                        {/*    <span>{blogData?.comments?.length}</span>*/}
                        {/*</li>*/}
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