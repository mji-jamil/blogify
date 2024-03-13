import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios.js";
import AuthorBlogs from "./AuthorBlogs.jsx";

export default function AuthorProfile() {
    const [authorData, setAuthorData] = useState(null);
    const { api } = useAxios();
    const { id } = useParams();
    useEffect(() => {
        const getBlogData = async () => {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${id}`,
                );
                // console.log(response.data);
                setAuthorData(response.data);
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };

        getBlogData();
    }, [id]);
    return (
        <>
            <main className="mx-auto max-w-[1020px] py-8">
                <div className="container">
                    <div className="flex flex-col items-center py-8 text-center">
                        {/*<ProfileImage/>*/}
                        <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
                            <img
                                className="max-w-full rounded-full"
                                src={`${
                                    import.meta.env.VITE_SERVER_BASE_URL
                                }/uploads/avatar/${authorData?.avatar}`}
                                alt={authorData?.firstName}
                            />

                            {/*<form id="form" encType="multipart/form-data">*/}
                            {/*    <button*/}
                            {/*        className="flex-center absolute bottom-4 right-4 h-7 w-7  bg-black/50 hover:bg-black/80"*/}
                            {/*        // onClick={handleImageUpload}*/}
                            {/*        type="submit"*/}
                            {/*    >*/}
                            {/*        /!*<img src={EditIcon} alt="Edit" />*!/*/}
                            {/*    </button>*/}
                            {/*<input id="file" type="file" hidden />*/}
                            {/*</form>*/}
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
                                {authorData?.firstName} {authorData?.lastName}
                            </h3>
                            <p className="leading-[231%] lg:text-lg">
                                {authorData?.email}
                            </p>
                        </div>
                        {/*<Bio/>*/}
                        <div className="mt-4 flex items-start gap-2 lg:mt-6">
                            <div className="flex-1">
                                <p className="leading-[188%] text-gray-400 lg:text-lg">
                                    {authorData?.bio}
                                </p>
                            </div>
                        </div>

                        <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
                        <AuthorBlogs authorData={authorData} />
                    </div>
                </div>
            </main>
        </>
    );
}