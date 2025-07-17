import React from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

function PiChart({ data }) {
  //   const formatData = (data) => {
  //     return data.map((entry) => {
  //       console.log(Object.keys(key)[0]);
  //     });
  //   };
  //   const chartData = formatData(data);

  return (
    <></>
    // <PieChart>
    //   <Pie
    //     data={data}
    //     cx="50%"
    //     cy="50%"
    //     outerRadius={100}
    //     fill="#8884d8"
    //     dataKey="value"
    //     label={({ name, value }) => `${name} ${value}`}
    //   >
    //     {chartData.map((entry, index) => (
    //       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    //     ))}
    //   </Pie>
    //   <Tooltip
    //     contentStyle={{
    //       backgroundColor: "rgba(31, 41, 55, 0.8)",
    //       borderColor: "#4B5563",
    //     }}
    //     itemStyle={{ color: "#E5E7EB" }}
    //   />
    //   <Legend />
    // </PieChart>
  );
}

export default PiChart;
