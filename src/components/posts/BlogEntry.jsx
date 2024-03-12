import { useForm } from "react-hook-form";
import { actions } from "../../actions";
import AddPhoto from "../../assets/icons/addPhoto.svg";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useBlog } from "../../hooks/useBlog.js";
import { useProfile } from "../../hooks/useProfile";
import Field from "../common/Field";
import { Link } from "react-router-dom";

const PostEntry = ({ onCreate }) => {
    const { auth } = useAuth();
    const { dispatch } = useBlog();
    const { api } = useAxios();
    const { state: profile } = useProfile();

    const user = profile?.user ?? auth?.user;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const handleBlogSubmit = async (formData) => {
        console.log(formData);
        dispatch({ type: actions.blog.DATA_FETCHING });

        try {
            const response = await api.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs`,
                { formData },
            );

            if (response.status === 200) {
                dispatch({
                    type: actions.blog.DATA_CREATED,
                    data: response.data,
                });
                // Close this UI
                onCreate();
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: actions.blog.DATA_FETCH_ERROR,
                error: response.error,
            });
        }
    };

    const handleImageUploadClick = () => {
        document.getElementById("photo").click();
    };

    return (
        <main>
            <section>
                <div className="container">
                    <form
                        action="#"
                        method="POST"
                        className="createBlog"
                        onSubmit={handleSubmit(handleBlogSubmit)}
                    >
                        <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
                            <div
                                className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer"
                                onClick={handleImageUploadClick}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                    />
                                </svg>
                                <p>Upload Your Image</p>
                                <input
                                    type="file"
                                    name="photo"
                                    id="photo"
                                    className="hidden"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <Field error={errors.title}>
                                <input
                                    {...register("title", {
                                        required: "Enter blog title",
                                    })}
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter your blog title"
                                />
                            </Field>
                        </div>

                        <div className="mb-6">
                            <Field error={errors.tags}>
                                <input
                                    {...register("tags", {
                                        required: "Enter at least one tag",
                                    })}
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
                                />
                            </Field>
                        </div>

                        <div className="mb-6">
                            <Field error={errors.content}>
                                <textarea
                                    {...register("content", {
                                        required:
                                            "Adding some text is mandatory!",
                                    })}
                                    id="content"
                                    name="content"
                                    placeholder="Write your blog content"
                                    rows="8"
                                ></textarea>
                            </Field>
                        </div>

                        {/*<Link*/}
                        {/*    to="/createBlog"*/}
                        {/*    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"*/}
                        {/*>*/}
                        {/*    Create Blog*/}
                        {/*</Link>*/}
                        <button
                            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                            type="submit"
                        >
                            Create Blog
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default PostEntry;