import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";

import moment from "moment";

const ExpenseChart = ({ timeFrame }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/expenses/aggregate?timeFrame=${timeFrame}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        // Determine the current period
        const currentPeriod =
          timeFrame === "week"
            ? `Week ${moment().week()}`
            : timeFrame === "month"
            ? moment().format("MMMM")
            : moment().format("YYYY");

        // Mark the current period's dot as active
        const formattedData = response.data.map((item) => ({
          ...item,
          isActive: item.periodLabel === currentPeriod,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [timeFrame]);

  // Custom dot component
  const renderCustomDot = (props) => {
    const { cx, cy, payload } = props;

    if (payload.isActive) {
      return <Dot cx={cx} cy={cy} r={8} fill="#262a2e" stroke="none" />;
    }

    return null;
  };

  return (
    <div className="-ml-16">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="periodLabel" />
          <YAxis axisLine={false} tickLine={false} tick={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="totalAmount"
            stroke="#262a2e"
            strokeWidth={2}
            dot={renderCustomDot}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
