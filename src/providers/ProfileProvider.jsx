import { ProfileContext } from "../context/index.js";
import { useReducer } from "react";
import { profileReducer, initialState } from "../reducers/ProfileReducer.js";

const ProfileProvider = ({ children }) => {
    const [state, dispatch] = useReducer(profileReducer, initialState);

    return (
        <ProfileContext.Provider value={{ state, dispatch }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;