 import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { formatCurrency } from "../../Utils/CustomMethods";
import EmptyChart from "../../ui/EmptyChart";
import { getDoughnutDatas } from "../../Utils/getDoughnutDatas";
import { useTheme } from "../../contexts/ThemeContext";
import { useCurrency } from "../../hooks/useCurrency";
ChartJS.register(ArcElement, Tooltip, Legend);


ChartJS.defaults.maintainAspectRatio = false;
ChartJS.defaults.responsive = true;

const PALETTE = [
    "#b0b4f1",
    "#9190e9",
    "#7c74e0",
    "#7866d5",
    "#5e4ab8",
    "#4c3e95",
    "#413877",
    "#ced2f7"
];

function DoughnutChart({ allDatas: transactions, label }) {
    const { lightTheme } = useTheme();
     const { format } = useCurrency();
    const emptyState = transactions.length >= 1;
    const textThemeColor = lightTheme ? "#272145" : "#ffffff";

    
    const { titles, amounts } = useMemo(
        () => getDoughnutDatas(transactions, label),
        [transactions, label]
    );

    
    const colors = amounts.map((_, i) => PALETTE[i % PALETTE.length]);

    const data = {
        labels: titles,
        datasets: [
            {
                label: "Amount",
                data: amounts,
                backgroundColor: colors,
                borderColor: colors,
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
                        label += format(context.raw);
                        return label;
                    }
                }
            }
        }
    };

    return (
        <div className="h-80 w-full">
            {emptyState ? (
                <Doughnut data={data} options={options} />
            ) : (
                <EmptyChart
                    src="/undraw_pie-chart_eo9h.svg"
                    desc={`Your ${label} chart will show here.`}
                />
            )}
        </div>
    );
}

export default DoughnutChart;