import React, { useState } from "react";
import ExpenseChart from "./components/ExpenseChart";
import TopSpending from "./components/TopSpending";

const Stats = () => {
  const [timeFrame, setTimeFrame] = useState("month"); // Default to 'month'

  // Styles
  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  };

  const buttonStyle = {
    border: "none",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "20px",
    cursor: "pointer",
    backgroundColor: "#f5f5f5",
    color: "#666",
    outline: "none",
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#292c31",
    color: "white",
  };

  return (
    <div>
      <div style={buttonContainerStyle}>
        <button
          onClick={() => setTimeFrame("week")}
          style={timeFrame === "week" ? activeButtonStyle : buttonStyle}
        >
          Week
        </button>
        <button
          onClick={() => setTimeFrame("month")}
          style={timeFrame === "month" ? activeButtonStyle : buttonStyle}
        >
          Month
        </button>
        <button
          onClick={() => setTimeFrame("year")}
          style={timeFrame === "year" ? activeButtonStyle : buttonStyle}
        >
          Year
        </button>
      </div>
      <br />
      <ExpenseChart timeFrame={timeFrame} />
      <h1 className="text-xl font-semibold my-5">Top Spendings</h1>
      <TopSpending />
    </div>
  );
};

export default Stats;
