export default function FavoriteBlogs({ favouriteBlogs }) {
    return (
        <>
            <div className="sidebar-card">
                <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                    Your Favourites ❤️
                </h3>
                {favouriteBlogs.map((blog) => (
                    <ul className="space-y-5 my-5" key={blog.id}>
                        <li>
                            <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                                {blog.title}
                            </h3>
                            <p className="text-slate-600 text-sm">
                                {blog.tags}
                            </p>
                        </li>
                    </ul>
                ))}
            </div>
        </>
    );
}