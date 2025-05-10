import { Link } from "react-router-dom";
export const Logo = () => {
    return (
        <div
            className="flex items-center justify-center text-center md:text-md text-light-text  dark:text-dark-text"
        >
            <Link to="/dashboard">
                <h1 className="text-2xl font-extrabold uppercase">
                    Trexpenser.
                </h1>
            </Link>
        </div>
    );
};
