import { FaBars, FaSun } from "react-icons/fa6";
import { MdDarkMode } from "react-icons/md";
const NavBar = () => {
    return (
        <div
            className="w-full p-3 flex justify-between
            bg-color-1 shadow-md shadow-color-2"
        >
            <div
                className="text-2xl text-color-8 font-bold uppercase flex
                items-center justify-center"
            >
                Trexpenser.
            </div>

            <div className="flex gap-5">
                <h1
                    className="text-2xl bg-color-2 p-2 text-color-8 rounded flex
                items-center justify-center"
                >
                    <FaSun />
                </h1>

                <h1
                    className="text-2xl bg-color-2 p-2 text-color-8 rounded
                text-center flex items-center justify-center"
                >
                    <FaBars />
                </h1>
            </div>
        </div>
    );
};
export default NavBar;
