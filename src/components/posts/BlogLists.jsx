import { useState } from "react";
import BlogSideCard from "./BlogSideCard.jsx";
import BlogMainCard from "./BlogMainCard.jsx";

export default function BlogLists({ blogs, popularBlogs, favouriteBlogs }) {
    const [showModals, setShowModals] = useState(
        Array(blogs.length).fill(false),
    );
    const toggleModal = (index) => {
        const newShowModals = [...showModals];
        newShowModals[index] = !newShowModals[index];
        setShowModals(newShowModals);
    };

    return (
        <>
            <main>
                <section>
                    <div className="container">
                        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                            <div className="space-y-3 md:col-span-5">
                                {blogs.map((blog, index) => (
                                    <BlogMainCard
                                        blog={blog}
                                        index={index}
                                        key={blog.id}
                                        toggleModal={toggleModal}
                                        showModals={showModals}
                                    />
                                ))}
                            </div>

                            <BlogSideCard
                                blogs={popularBlogs}
                                favouriteBlogs={favouriteBlogs}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}