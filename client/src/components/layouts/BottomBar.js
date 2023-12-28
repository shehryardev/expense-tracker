import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BottomBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  return (
    <div className="fixed inset-x-0 bottom-0 bg-[#f6f6f6]">
      <nav
        className="mx-auto px-4 py-4 flex justify-between items-center"
        style={{ maxWidth: "390px" }}
      >
        <a
          onClick={() => {
            navigate("/");
          }}
          className={` hover:text-gray-900 ${
            currentPath === "/" ? "text-[#292d32]" : "text-gray-600"
          }`}
        >
          <i className="fa-solid fa-house text-xl"></i>
        </a>
        <a
          onClick={() => {
            navigate("/add-transaction");
          }}
          className={`text-white bg-[#292d32] px-3 py-1.5 rounded-full text-xl ${
            currentPath === "/add-transaction" ? "bg-[#292d32]" : "bg-gray-600"
          }`}
        >
          <i className="fa-solid fa-plus"></i>
        </a>
        <a
          onClick={() => {
            navigate("/stats");
          }}
          className={` hover:text-gray-900 ${
            currentPath === "/stats" ? "text-[#292d32]" : "text-gray-600"
          }`}
        >
          <i className="fa-solid fa-chart-simple text-xl"></i>
        </a>
      </nav>
    </div>
  );
};

export default BottomBar;
