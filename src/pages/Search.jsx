import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios.js";
import { useState } from "react";
import CloseIcon from "../assets/icons/close.svg";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(false);
    const { api } = useAxios();

    const fetchData = async () => {
        try {
            const response = await api.get(
                `${
                    import.meta.env.VITE_SERVER_BASE_URL
                }/search?q=${searchQuery}`,
            );
            if (response.status === 200) {
                setSearchResults(response.data.data);
                setError(false);
            }
        } catch (error) {
            setError(true);
        }
    };

    const handleSearch = () => {
        fetchData();
        setSearchQuery("");
    };

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
        setSearchResults([]);
    };

    return (
        <>
            <section className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
                <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
                    <div>
                        <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
                            Search for Your Desire Blogs
                        </h3>
                        <input
                            type="text"
                            placeholder="Start Typing to Search"
                            className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
                            value={searchQuery}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="">
                        <button
                            onClick={handleSearch}
                            className="mt-4 right-2 top-2 cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded-md"
                        >
                            Search
                        </button>
                    </div>

                    <div className="">
                        <h3 className="text-slate-400 font-bold mt-6">
                            Search Results
                        </h3>
                        <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
                            {setSearchResults.length !== 0 && !error ? (
                                searchResults.map((result) => (
                                    <Link
                                        to={`/blog/${result.id}`}
                                        key={result?.id}
                                    >
                                        <div className="flex gap-6 py-2">
                                            <img
                                                className="h-28 object-contain"
                                                src={`${
                                                    import.meta.env
                                                        .VITE_SERVER_BASE_URL
                                                }/uploads/blog/${
                                                    result?.thumbnail
                                                }`}
                                                alt="Thumbnail"
                                            />
                                            <div className="mt-2">
                                                <h3 className="text-slate-300 text-xl font-bold">
                                                    {result?.title}
                                                </h3>

                                                <p className="mb-6 text-sm text-slate-500 mt-1">
                                                    {result?.content}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-xl text-red-400">
                                    Nothing found! Try another search
                                </div>
                            )}
                        </div>
                    </div>

                    <Link to="/">
                        <img
                            src={CloseIcon}
                            alt="Close"
                            className="absolute right-14 top-2 cursor-pointer w-8 h-8"
                        />
                    </Link>
                </div>
            </section>
        </>
    );
}