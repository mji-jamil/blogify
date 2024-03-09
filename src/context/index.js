import { createContext } from "react";

const AuthContext = createContext(null);
const ProfileContext = createContext(null);
const BlogContext = createContext(null);

export { AuthContext, ProfileContext, BlogContext };