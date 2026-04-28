import "chartjs-adapter-moment";
import ChartDeferred from "chartjs-plugin-deferred";

import EmptyChart from "../../ui/EmptyChart";
 
import { useCurrency } from "../../hooks/useCurrency";

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
 
ChartJS.defaults.maintainAspectRatio = false;
ChartJS.defaults.responsive = true;


const LineChart = ({ allDatas, incomes, expenses, label, type = "single" }) => {
  
   const { format } = useCurrency();
    const emptyState = allDatas.length >= 1;
 
    const doubleLabels =
        incomes.length >= expenses.length
            ? incomes.map(d => d.date)
            : expenses.map(d => d.date);

    const data = {
        labels: doubleLabels,
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
                pointRadius: 4  
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
                        label += format(context.raw);
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
                    display: false
                },
                border: {
                    display: false  
                },
                ticks: {
                    display: false
                }
            },
            y: {
                grid: {
                    color: context =>
                        context.tick.value === 0 ? "black" : "rgba(0,0,0,0)"
                },
                border: {
                    display: true  
                },
                ticks: {
                    display: false
                }
            }
        }
    };

    return (
        <div className="h-60 w-full">
            {emptyState ? (
                <Line
                    data={type === "double" ? data : singleData}
                    options={options}
                />
            ) : (
                <EmptyChart
                    src="/undraw_blank-canvas_a6x5.svg"
                    desc={`Your ${label.toLowerCase()} chart will show here.`}
                />
            )}
        </div>
    );
};

export default LineChart;
