import { useMemo } from "react";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { formatCurrency } from "../../../Utils/CustomMethods.js";
import expenesArray from "../../../data/DoughnutDatas.js";
import { useTheme } from "../../../contexts/ThemeContext";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ allDatas: transactions, label }) {
    const { lightTheme } = useTheme();
    

    const textThemeColor = lightTheme ? "#272145" : "#ffffff";

    const titles = useMemo(
        () => expenesArray(transactions, label).titles,
        [transactions, label]
    );
    const amounts = useMemo(
        () => expenesArray(transactions, label).amounts,
        [transactions, label]
    );

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
                position: "top",
                labels: {
                    color: textThemeColor
                }
            },
            title: {
                display: true,
                text:
                    label === "income"
                        ? "Income Sources Breakdown"
                        : "Expense Distribution By Category",
                color: textThemeColor
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
