import Chart from "react-apexcharts";
import { useTheme } from "../../contexts/ThemeContext";
const ApexLineChart = ({ incomes, expenses }) => {
    const { lightTheme } = useTheme();
    const incomeDatas = incomes.map(item => ({ x: item.date, y: item.amount }));

    const expenseDatas = expenses.map(item => ({
        x: item.date,
        y: item.amount
    }));

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

    return <Chart options={options} series={series} type="area" height={260} />;
};

export default ApexLineChart;
