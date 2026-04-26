 import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import Button from "../features/Form/Button";

const TableFooter = ({
  currentPage,
  totalPages,
  totalTransaction,
  maxTransactionToShow,
  onNext,
  onPrev,
}) => {
  const from = (currentPage - 1) * maxTransactionToShow + 1;
  const to = Math.min(currentPage * maxTransactionToShow, totalTransaction);

  return (
    <div className="border-t-2 border-t-light-dividers p-2 flex items-center 
      justify-around flex-col gap-3">
      <p>
        Showing{" "}
        <span className="font-semibold">{from}</span>
        {" "}–{" "}
        <span className="font-semibold">{to}</span>
        {" "}of{" "}
        <span className="font-semibold">{totalTransaction}</span>
        {" "}transactions.
      </p>

      <div className="flex justify-between items-center w-full md:justify-center md:gap-10">
        <Button
          text={<FaCircleArrowLeft />}
          onButtonClick={onPrev}
          disabled={currentPage === 1}
          className={`bg-light-primaryCTA text-white px-5 py-2 rounded-md
            ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : ""}`}
        />
        <span className="text-sm font-semibold">
          {currentPage} / {totalPages}
        </span>
        <Button
          text={<FaCircleArrowRight />}
          onButtonClick={onNext}
          disabled={currentPage === totalPages}
          className={`bg-light-primaryCTA text-white px-5 py-2 rounded-md
            ${currentPage === totalPages ? "opacity-40 cursor-not-allowed" : ""}`}
        />
      </div>
    </div>
  );
};

export default TableFooter;