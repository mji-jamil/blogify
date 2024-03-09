import { useContext } from "react";
import { ProfileContext } from "../context/index.js";

export const useProfile = () => {
    return useContext(ProfileContext);
};