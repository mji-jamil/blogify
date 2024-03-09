import { useReducer } from "react";
import { BlogContext } from "../context";
import { initialState, blogReducer } from "../reducers/BlogReducer.js";

const PostProvider = ({ children }) => {
    const [state, dispatch] = useReducer(blogReducer, initialState);

    return (
        <BlogContext.Provider value={{ state, dispatch }}>
            {children}
        </BlogContext.Provider>
    );
};

export default PostProvider;