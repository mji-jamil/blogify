import ProfileImage from "./ProfileImage.jsx";
import Bio from "./Bio.jsx";
import { useProfile } from "../../hooks/useProfile.js";
import { useAuth } from "../../hooks/useAuth.js";

const ProfileInfo = () => {
    const { state } = useProfile();
    const { auth } = useAuth();
    return (
        <>
            <div className="flex flex-col items-center py-8 text-center">
                <ProfileImage />
                <div>
                    <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
                        {auth?.user?.firstName} {auth?.user?.lastName}
                    </h3>
                    <p className="leading-[231%] lg:text-lg">
                        {auth?.user?.email}
                    </p>
                </div>
                <Bio />
                <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
            </div>
        </>
    );
};

export default ProfileInfo;