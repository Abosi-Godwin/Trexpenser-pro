import "chartjs-adapter-moment";
import { formatCurrency } from "../../Utils/CustomMethods";
import { useTheme } from "../../contexts/ThemeContext";
import { savingsGoals } from "../../data/data";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    TimeScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    defaults
} from "chart.js/auto";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    TimeScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

function BarChart({ allDatas, showTitle, type }) {
    const { lightTheme } = useTheme();

    const bgThemeColor = lightTheme ? "#f0f2fd" : "#12141c";

    const textThemeColor = lightTheme ? "#272145" : "#ffffff";

    const options = {
        responsive: true,
        indexAxis: type,

        scales: {
            x: {
                type: "time",
                grid: {
                    color: bgThemeColor
                },
                border: {
                    color: bgThemeColor
                },
                ticks: {
                    color: textThemeColor
                }
            },
            y: {
                grid: {
                    color: bgThemeColor
                },
                border: {
                    color: bgThemeColor
                },
                ticks: {
                    color: textThemeColor
                },

                min: 0
            }
        },
        plugins: {
            legend: {
                position: "top",
                display: true,
                labels: {
                    color: textThemeColor,
                    font: {
                        weight: "bold"
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || "";
                        if (label) {
                            label += ": ";
                        }
                        label += formatCurrency(context.raw.y);
                        return label;
                    }
                }
            },
            title: {
                display: "true",
                text: "Income Vs. Expenses Over Time",
                color: textThemeColor
            }
        }
    };
    const data = {
        datasets: [
            {
                label: "Income",
                data: allDatas
                    .filter(d => d.type === "income")
                    .map(d => ({ x: d.date, y: d.amount })),
                borderRadius: 9,
                backgroundColor: "#413877"
            },
            {
                label: "Expenses",
                data: allDatas
                    .filter(d => d.type === "expense")
                    .map(d => ({ x: d.date, y: d.amount })),
                borderRadius: 9,
                backgroundColor: "#7c74e0"
            }
        ]
    };

    const config = {
        type: "bar",
        data: {
            labels: savingsGoals.map(data => data.name),
            datasets: [
                {
                    label: "Amount Saved",
                    data: savingsGoals.map(data => data.currentAmount),
                    backgroundColor: "#b0b4f1",
                    borderColor: "#5e4ab8",
                    borderWidth: 1
                },
                {
                    label: "Target Amount",
                    data: savingsGoals.map(data => data.targetAmount),
                    backgroundColor: "#5e4ab8",
                    borderColor: "#b0b4f1",
                    borderWidth: 0.8
                }
            ]
        },
        options: {
            title: {
                color: "ffffff"
            },
            indexAxis: "y",
            scales: {
                x: {
                    beginAtZero: true,
                    max: savingsGoals.map(data => data.targetAmount)[-1],
                    title: {
                        display: true,
                        color: textThemeColor,
                        text: "Amount saved"
                    },
                    ticks: {
                        color: textThemeColor
                    }
                },
                y: {
                    title: {
                        display: true,
                        color: textThemeColor,
                        text: "Savings Goals"
                    },
                    ticks: {
                        color: textThemeColor
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: textThemeColor
                    }
                },
                tooltip: {
                    callbacks: {
                        title: tooltipItems => tooltipItems[0].label,
                        label: tooltipItem => {
                            const chart = tooltipItem.chart;
                            const dataIndex = tooltipItem.dataIndex;
                            const savedValue =
                                chart.data.datasets[0].data[dataIndex];
                            const targetValue =
                                chart.data.datasets[1].data[dataIndex];
                            return [
                                `Saved: ${formatCurrency(savedValue)}`,
                                `Target: ${formatCurrency(targetValue)}`
                            ];
                        }
                    }
                }
            }
        }
    };

    return (
        <div className="h-80">
            <Bar
                data={type === "x" ? data : config.data}
                options={type === "x" ? options : config.options}
            />
        </div>
    );
}

export default BarChart;
