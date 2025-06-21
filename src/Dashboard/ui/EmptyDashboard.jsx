import { Link } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";

import { useAuth } from "../contexts/AuthContext";

import Button from "../features/Form/Button";

const EmptyDashboard = () => {
    const { user } = useAuth();

    return (
        <div
            className="h-screren bgh-light-mainBackground rounded-md
        overflow-hidden p-8 bg-amber-600"
        >
            <div className="flex flex-col items-center justify-center gap-4">
                <h1
                    className="text-xl font-bold uppercase text-ceknter
                text-light-text"
                >
                    Welcome, {user?.user_metadata?.userName}!
                </h1>
                <p className="text-center">
                    Looks like you haven't added any transactions yet.
                </p>
                <div className="">
                    <img
                        src="undraw_add-notes_9xls.svg"
                        alt="No transactions yet"
                        className="w-48"
                    />
                </div>
            </div>
            <div className="flex items-center justify-center py-6">
                <Link to="/dashboard/transactions">
                    <Button
                        text="Start tracking your expenses"
                        className="bg-light-primaryCTA p-3 rounded-md text-white
                        font-bold capitalize"
                    />
                </Link>
            </div>

            <ul
                className="flex flex-col gap-2 py-4 px-2 bg-light-background
            rounded-md"
            >
                <li className="flex gap-2 items-center">
                    <FaCircleCheck className="text-light-iconColor" />
                    Set savings goals
                </li>
                <li className="flex gap-2 items-center">
                    <FaCircleCheck className="text-light-iconColor" /> See where
                    your money goes
                </li>
                <li className="flex gap-2 items-center">
                    <FaCircleCheck className="text-light-iconColor" />
                    Track income and expenses easily
                </li>
            </ul>
        </div>
    );
};

export default EmptyDashboard;
