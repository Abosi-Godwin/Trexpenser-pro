import Chart from "react-apexcharts";
import { useTheme } from "../../../contexts/ThemeContext";
const ApexRadialChart = ({ percentage }) => {
    const { lightTheme } = useTheme();

    const options = {
        series: [percentage],
        chart: {
            type: "radialBar",
            height: 120, // smaller height
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                hollow: {
                    size: "60%",
                    background: lightTheme ? "#b0b4f1" : "#12141c"
                },
                track: {
                    background: lightTheme ? "#ced2f7" : "#12141c",
                    strokeWidth: "100%",
                    margin: 0,
                    dropShadow: {
                        enabled: false
                    }
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        offsetY: 0,
                        fontSize: "14px",
                        color: "#5e4ab8"
                    }
                }
            }
        },
        grid: {
            padding: {
                top: -10,
                bottom: -10
            }
        },
        fill: {
            type: "solid", // or "gradient"
            colors: ["#5e4ab8"]
        },
        labels: ["Progress"]
    };

    return (
        <div className="w-[100px]">
            <Chart
                options={options}
                series={options.series}
                type="radialBar"
                height={100}
            />
        </div>
    );
};

export default ApexRadialChart;
