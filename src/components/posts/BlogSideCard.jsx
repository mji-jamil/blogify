import PopularBlogs from "./PopularBlogs.jsx";
import FavoriteBlogs from "./FavoriteBlogs.jsx";
import { useAuth } from "../../hooks/useAuth.js";

export default function BlogSideCard({ blogs, favouriteBlogs }) {
    const { auth } = useAuth();
    return (
        <>
            <div className="md:col-span-2 h-full w-full space-y-5">
                <PopularBlogs blogs={blogs} />
                {auth.authToken && (
                    <FavoriteBlogs favouriteBlogs={favouriteBlogs} />
                )}
            </div>
        </>
    );
}