import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    Filler
);

const AreaChart = () => {
    const data = {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
            {
                label: "Saved Amount",
                data: [200, 400, 600, 800, 1000],
                fill: true,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                tension: 0.4,
                order: 1 // Layering order
            },
            {
                label: "Target Amount",
                data: [500, 700, 900, 1100, 1300],
                fill: true,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
                tension: 0.4,
                order: 2 // Higher order ensures it appears on top
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top"
            },
            tooltip: {
                callbacks: {
                    label: tooltipItem => {
                        const value = tooltipItem.raw;
                        return `₦${value.toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(200, 200, 200, 0.3)"
                }
            }
        }
    };

    return <Line data={data} options={options} />;
};

export default AreaChart;
