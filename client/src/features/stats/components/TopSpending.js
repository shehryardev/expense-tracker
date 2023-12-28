import React, { useEffect, useState } from "react";
import Transaction from "../../../components/common/Transaction";
import axios from "axios";
const TopSpending = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/expenses/top-spending?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data.data.data);
      setTransactions((prev) => [...prev, ...response.data.data.data]);
      setHasMore(response.data.data.data.length > 0);
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
    <div>
      {transactions.map((transaction) => (
        <Transaction key={transaction.id} {...transaction} />
      ))}
      {loading && <p>Loading...</p>}
      <br />
      <br />
    </div>
  );
};

export default TopSpending;
