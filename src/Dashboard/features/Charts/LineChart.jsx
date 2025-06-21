import "chartjs-adapter-moment";
import ChartDeferred from "chartjs-plugin-deferred";
import { formatCurrency } from "../../Utils/CustomMethods.js";
//import { useTransactions } from "../../contexts/TransactionsContext";

import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Filler
} from "chart.js";

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Filler,
    ChartDeferred
);

ChartJS.defaults.maintainAspectRatio = true;
ChartJS.defaults.backgroundColor = "#ffffff";
ChartJS.defaults.borderColor = "#ffffff";
ChartJS.defaults.color = "#000000";
ChartJS.defaults.responsive = true;
const LineChart = ({ allDatas,incomes, expenses, label, type = "single" }) => {
    // const {  transactions } = useTransactions();

    const data = {
        labels: [...allDatas.map(data => data.date)],

        datasets: [
            {
                label: "Income",
                data: [...incomes.map(data => data.amount)],
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "#e4e7fb",
                borderWidth: 2,
                tension: 0.4,
                fill: true
            },
            {
                label: "Expense",
                data: [...expenses.map(data => data.amount)],
                borderColor: "#ced2f7",
                backgroundColor: "#7866d5",
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }
        ]
    };
    const singleData = {
        labels:
            label === "Income"
                ? [...incomes.map(data => data.date)]
                : [...expenses.map(data => data.date)],
        datasets: [
            {
                label,
                data:
                    label === "Income"
                        ? [...incomes.map(data => data.amount)]
                        : [...expenses.map(data => data.amount)],
                borderColor:
                    label === "Income" ? "#5e4ab8" : "rgba(75, 192, 192, 1)",
                backgroundColor:
                    label === "Income" ? "#ced2f7" : "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                showLine: true,
                pointRadiuys: 4
            }
        ]
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,
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
            },
            deferred: {
                yOffset: "50%"
            }
        },
        scales: {
            x: {
                grid: {
                    drawBorder: false, // Shows the bottom border
                    display: false // Hides X-axis gridlines except the border
                },
                ticks: {
                    display: false // Hides X-axis labels
                }
            },
            y: {
                grid: {
                    drawBorder: true, // Removes the outer Y-axis border
                    color: context =>
                        context.tick.value === 0 ? "black" : "rgba(0,0,0,0)" // Displays only the left line
                },
                ticks: {
                    display: false // Hides Y-axis labels
                }
            }
        }
    };

    return (
        <div className="h-60">
            <Line
                data={type === "double" ? data : singleData}
                options={options}
            />
        </div>
    );
};

export default LineChart;
