import BarChart from "./Utilities/BarChart.jsx";
import DoughnutChart from "./Utilities/DoughnutChart.jsx";

function Summary({ datas, doughnutDatas, onCurrencyFormat }) {
    const expenseTitle = "Expense Distribution By Category";
    const incomeTitle = "Income Sources Breakdown";
    const expense = "expense";
    const income = "income";
    return (
        <div className="bg-color-2 py-6 px-2">
            <h1 className="uppercase text-4xl font-bold text-color-4">
                Financial {<br />} overview
            </h1>
            <div className="md:flex py-4">
                <div className="flex items-start justify-start w-full">
                    <BarChart
                        datas={datas}
                        onCurrencyFormat={onCurrencyFormat}
                    />
                </div>
                <div
                    className="flex flex-col justify-center items-center
            gap-4 md:flex-row"
                >
                    <DoughnutChart
                        datas={datas}
                        category={expense}
                        title={expenseTitle}
                        onCurrencyFormat={onCurrencyFormat}
                        doughnutDatas={doughnutDatas}
                    />
                    <DoughnutChart
                        datas={datas}
                        category={income}
                        title={incomeTitle}
                        onCurrencyFormat={onCurrencyFormat}
                        doughnutDatas={doughnutDatas}
                    />
                </div>
            </div>
        </div>
    );
}
export default Summary;
