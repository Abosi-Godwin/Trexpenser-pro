import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

import Button from "../features/Form/Button";

const TableFooter = ({maxTransactionToShow,totalTransaction}) => {
    return (
        <div className="border-t-2 border-t-light-dividers p-2 flex items-center justify-around flex-col gap-3">
            <p>
                You're seeing{" "}
                <span className="font-semibold"> {totalTransaction} </span> to
                <span className="font-semibold">
                    {maxTransactionToShow >= totalTransaction
                        ? totalTransaction
                        : maxTransactionToShow}
                </span>{" "}
                of
                <span className="font-semibold"> {totalTransaction} </span>
                transactions.
            </p>
            <div
                className="flex justify-between items-center w-full
                md:justify-center md:gap-10"
            >
                <Button
                    text={<FaCircleArrowLeft />}
                    className="bg-light-primaryCTA text-white px-5 py-2
                        rounded-md"
                />
                <Button
                    text={<FaCircleArrowRight />}
                    className="bg-light-primaryCTA text-white px-5 py-2 rounded-md"
                />
            </div>
        </div>
    );
};

export default TableFooter;
