import PopularBlogs from "./PopularBlogs.jsx";
import FavoriteBlogs from "./FavoriteBlogs.jsx";

export default function BlogSideCard({ blogs, favouriteBlogs }) {
    return (
        <>
            <div className="md:col-span-2 h-full w-full space-y-5">
                <PopularBlogs blogs={blogs} />
                <FavoriteBlogs favouriteBlogs={favouriteBlogs} />
            </div>
        </>
    );
}