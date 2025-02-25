import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { formatCurrency } from "../../../Utils/CustomMethods.js";
import { useTransactions } from "../../../contexts/TransactionsContext.jsx";
import expenesArray from "../../../data/DoughnutDatas.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ label }) {
    const { transactions } = useTransactions();
    const titles = expenesArray(transactions, label).titles;
    const amounts = expenesArray(transactions, label).amounts;

    const data = {
        labels: titles,

        datasets: [
            {
                label: "Amount",
                data: amounts,
                backgroundColor: [
                    "#b0b4f1",
                    "#9190e9",
                    "#7c74e0",
                    "#7866d5",
                    "#5e4ab8",
                    "#4c3e95",
                    "#413877",
                    "#ced2f7"
                ],
                borderColor: [
                    "#b0b4f1",
                    "#9190e9",
                    "#7c74e0",
                    "#7866d5",
                    "#5e4ab8",
                    "#4c3e95",
                    "#413877",
                    "#ced2f7"
                ],
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text:
                    label === "income"
                        ? "Income Sources Breakdown"
                        : "Expense Distribution By Category"
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || "";
                        if (label) {
                            label += ": ";
                        }
                        label += formatCurrency(context.raw);
                        return label;
                    }
                }
            }
        }
    };

    return (
        <div className="h-80">
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default DoughnutChart;
