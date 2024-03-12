import React, { useState } from "react";
import BlogSideCard from "./BlogSideCard.jsx";
import BlogMainCard from "./BlogMainCard.jsx";
import ScrollUpIcon from "../../assets/icons/scroll-up.png";

export default function BlogLists({
    blogs,
    popularBlogs,
    favouriteBlogs,
    showEndMessage,
    handleGoTop,
}) {
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
                                        showEndMessage={showEndMessage}
                                    />
                                ))}
                                {showEndMessage && (
                                    <div className="py-2 px-4 rounded mt-4 flex justify-center items-center">
                                        <p className="text-white-800 font-bold text-lg mr-4">
                                            Blog ended.
                                        </p>
                                        <button
                                            className="flex items-center"
                                            onClick={handleGoTop}
                                        >
                                            <p className="text-white-800 font-bold text-lg">
                                                Go to top
                                            </p>
                                            <img
                                                src={ScrollUpIcon}
                                                alt=""
                                                className="ml-2"
                                            />
                                        </button>
                                    </div>
                                )}
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