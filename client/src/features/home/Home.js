import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import Transaction from "../../components/common/Transaction";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/expenses?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setTransactions((prev) => [...prev, ...response.data.data.expenses]);
      setHasMore(response.data.data.expenses.length > 0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    if (scrollHeight - scrollTop <= clientHeight + 100) {
      // Adjust buffer as needed
      if (hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, page]);
  useEffect(() => {
    loadTransactions();
  }, [page]);

  return (
    <div onScroll={handleScroll}>
      <div className="flex items-center justify-between">
        <div className="">
          <p className="text-xs text-[#a1a1a1]">Good Morning!</p>
          <div className="flex items-center space-x-1 mt-1">
            <img
              src={user?.picture}
              alt=""
              className="h-5 w-5 rounded-full bg-gray-200"
            />
            <p className="font-semibold ">{user?.name?.split(" ")[0]}</p>
          </div>
        </div>
        <i class="fa-solid fa-bell text-[#292d32] p-2.5 bg-white rounded-full"></i>
      </div>
      <Card />
      <h1 className="text-xl font-semibold">Transactions</h1>
      <div>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} {...transaction} />
        ))}
        {loading && <p>Loading...</p>}
        <br />
        <br />
      </div>
    </div>
  );
};

export default Home;
