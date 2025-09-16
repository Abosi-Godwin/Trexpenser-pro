import { motion } from "framer-motion";

import { FaRightFromBracket } from "react-icons/fa6";

import SidebarItem from "../ui/SidebarItem";
import Avatar from "./Avatar";

import { useAuth } from "../contexts/AuthContext";

import { sideBarItems } from "../data/data";
import { dropdownVariants } from "../Utils/AnimationVariants";

const NavBar = ({ isMenuOpen, closeNavBar }) => {
    const { logOut } = useAuth();

    const handleLogOut = () => logOut();


    return (
        <motion.nav
            variants={dropdownVariants}
            initial="hidden"
            animate={isMenuOpen ? "visible" : "hidden"}
            exit="hidden"
            className="flex flex-col justify-between items-center py-4"
        >
            <ul className="w-full grid grid-cols-1 gap-3">
                {sideBarItems.map((data, index) => (
                    <SidebarItem
                        key={index}
                        item={data}
                        closeNavBar={closeNavBar}
                    />
                ))}
            </ul>
            <div className="w-full py-4 flex flex-col gap-6">
                <Avatar />
                <div>
                    <button
                        className="flex justify-start items-center p-2
                     text-md gap-2 inline font-bold bg-light-secondaryAccent
                     rounded-md"
                        onClick={handleLogOut}
                    >
                        <FaRightFromBracket
                            className="-rotate-25
                         text-xl text-light-primaryCTA
                         dark:text-dark-primaryCTA"
                        />
                        Log out
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default NavBar;
