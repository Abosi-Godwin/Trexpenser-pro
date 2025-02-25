import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import EdithAndDelBtn from "./EdithAndDelBtn.jsx";

export default function ListItem({
    expenseDetails,
    onCurrencyFormat,
    onDataEdit,
    onDataDelete
}) {
    const isIncome = expenseDetails.type === "income";

    return (
        <div
            className="h-28 bg-color-3
    rounded flex justify-between overflow-hidden"
            data-id={expenseDetails.id}
        >
            <div className="flex justify-between gap-1.5">
                <div className="flex justtify-center itemzs-center gap-1.5">
                    <div className="w-2 h-full bg-color-9"></div>
                    <div
                        className="flex justify-center
            items-center"
                    >
                        {isIncome ? (
                            <div className="p-2 bg-color-2 text-color-9 rounded">
                                {" "}
                                <FaArrowUp />{" "}
                            </div>
                        ) : (
                            <div className="p-2 bg-color-2  text-red-600 rounded">
                                <FaArrowDown />{" "}
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-2">
                    <div className="overflow-hidden truncate text-clip">
                        <h1
                            className="text-xl text-color-7 font-bold truncate
                            capitalize
                  "
                        >
                            {expenseDetails.description}
                        </h1>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-color-10">
                            {onCurrencyFormat(expenseDetails.amount)}
                        </h1>
                    </div>
                    <div>
                        <p className="text-color-7 text-sm">
                            {isIncome ? "Earned" : "Spent"}{" "}
                            {isIncome ? "From" : "On"} {expenseDetails.category}{" "}
                        </p>
                        <p className="text-color-10">
                            Date: {expenseDetails.date.replace(/-/g, "/")}
                        </p>
                    </div>
                </div>
            </div>
            <EdithAndDelBtn
                onDataEdit={onDataEdit}
                onDataDelete={onDataDelete}
                data={expenseDetails}
            />
        </div>
    );
}
