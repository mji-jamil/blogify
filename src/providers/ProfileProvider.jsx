import { ProfileContext } from "../context/index.js";
import { useReducer } from "react";
import { profileReducer, initialState } from "../reducers/ProfileReducer.js";

const ProfileProvider = ({ children }) => {
    const [state, dispatch] = useReducer(profileReducer, initialState);
    // console.log("Context State:", JSON.stringify(state, null, 2));
    return (
        <ProfileContext.Provider value={{ state, dispatch }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;