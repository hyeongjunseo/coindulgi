import React, { PureComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { fetchChartData } from "../store";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Show() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const chartData = useSelector((state) => {
    return state.details.chartData;
  });

  console.log(id);
  console.log(chartData);

  useEffect(() => {
    dispatch(fetchChartData(id));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <AreaChart
        width={500}
        height={400}
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </div>
  );
}
