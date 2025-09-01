import { Link } from "react-router-dom";

const EmptyDashboard = ({
    destination,
    link,
    description,
    imgSrc,
    showBtn
}) => {
    return (
        <div className="p-5 flex items-center justify-center flex-col">
            <img src={imgSrc} className="p-8" />
            <p className="text-center text-gray-600 py-4">{description}</p>
            {showBtn && (
                <Link
                    to={`/dashboard/${destination}`}
                    className="flex justify-start items-center p-2
                     text-md gap-2 inline font-bold bg-light-primaryCTA
                     text-white
                     rounded-md"
                >
                    {link}
                </Link>
            )}
        </div>
    );
};

export default EmptyDashboard;
