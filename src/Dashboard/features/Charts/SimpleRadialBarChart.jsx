import React from "react";
import {
    RadialBarChart,
    RadialBar,
    Legend,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const data = [
    {
        name: "18-24",
        uv: 31.47,
        fill: "#8884d8"
    },
    {
        name: "25-29",
        uv: 26.69,
        fill: "#83a6ed"
    },
    {
        name: "30-34",
        uv: 15.69,
        fill: "#8dd1e1"
    },
    {
        name: "35-39",
        uv: 8.22,
        fill: "#82ca9d"
    },
    {
        name: "40-49",
        uv: 8.63,
        fill: "#a4de6c"
    },
    {
        name: "50+",
        uv: 2.63,
        fill: "#d0ed57"
    },
    {
        name: "Unknown",
        uv: 6.67,
        fill: "#ffc658"
    }
];

const SimpleRadialBarChart = () => {
    return (
        <div style={{ width: "100%", height: 300, backgroundColor:"purple"}}>
            <ResponsiveContainer>
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="10%"
                    outerRadius="80%"
                    barSize={10}
                    data={data}
                >
                    <RadialBar
                        minAngle={15}
                        background
                        clockWise
                        dataKey="uv"
                    />
                    <Legend
                        iconSize={10}
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                    />
                    <Tooltip />
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SimpleRadialBarChart;
