import Chart from "react-apexcharts";
import { useTransactions } from "../../../contexts/TransactionsContext.jsx";

const ApexLineChart = () => {
    const { incomes, expenses } = useTransactions();

   
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
            toolbar: { show: false }
        },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth" },
        xaxis: {
            type: "datetime",
            labels: {
                format: "yyyy-MM-dd"
            }
        },
        tooltip: {
            x: {
                format: "yyyy-MM-dd"
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
