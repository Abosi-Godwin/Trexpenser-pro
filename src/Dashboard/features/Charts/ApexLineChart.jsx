import Chart from "react-apexcharts";
import { useTheme } from "../../contexts/ThemeContext";

import EmptyChart from "../../ui/EmptyChart";
const ApexLineChart = ({ incomes, expenses }) => {
    const { lightTheme } = useTheme();
    const incomeDatas = incomes.map(item => ({ x: item.date, y: item.amount }));

    const expenseDatas = expenses.map(item => ({
        x: item.date,
        y: item.amount
    }));

    const emptyState = incomeDatas.length >= 1 || expenseDatas.length >= 1;

    const options = {
        chart: {
            height: 100,
            type: "area",
            zoom: { enabled: false },
            toolbar: { show: false },
            events: {
                beforeMount: function (chartContext, config) {}
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#7866d5", "#b0b4f1"],
        stroke: { curve: "smooth" },
        xaxis: {
            type: "datetime",
            labels: {
                format: "yyyy-MM-dd",
                style: {
                    colors: lightTheme ? "#272145" : "#ffffff",
                    fontSize: "12px"
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: lightTheme ? "#272145" : "#ffffff",
                    fontSize: "12px"
                }
            }
        },
        tooltip: {
            x: {
                format: "yyyy-MM-dd"
            },
            theme: "dark"
        },
        legend: {
            labels: {
                colors: ["ffffff", "fff222"]
            }
        },
        grid: {
            borderColor: lightTheme ? "#f0f2fd" : "#12141c",
            yaxis: {
                lines: {
                    show: true
                }
            }
        }
    };

    const series = [
        { name: "Income", data: incomeDatas },
        { name: "Expenses", data: expenseDatas }
    ];

    return emptyState ? (
        <Chart options={options} series={series} type="area" height={260} />
    ) : (
        <EmptyChart
            src="/undraw_visual-data_3ghp.svg"
            desc="Your income and expense charts will show here."
        />
    );
};

export default ApexLineChart;
