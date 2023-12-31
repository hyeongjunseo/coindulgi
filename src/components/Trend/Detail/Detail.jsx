import React, { PureComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChartData } from "../../../store";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Header from "../../Header/Header";

import "../../../styles/global.scss";
import "./Detail.scss";
import PageHead from "../../shared/PageHead";

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
    <div className="page-container">
      <PageHead title={`Live Price Chart & Market Data for ${id}`} />
      <Header />
      <div className="detail-title">
        <h2>{id}</h2>
      </div>
      <div className="chart-container">
        <ResponsiveContainer
          className="responsiveContainer"
          width="80%"
          height="100%"
        >
          <AreaChart
            width={500}
            height={400}
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#181a1c"
              fill="#555e68"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
