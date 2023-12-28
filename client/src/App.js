import "./App.css";
import Home from "./features/home/Home";
import BottomBar from "./components/layouts/BottomBar";
import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import useAuth from "./hooks/useAuth";
import AddTransaction from "./features/addTransaction/AddTransaction";
import Stats from "./features/stats/Stats";
function App() {
  const user = useAuth();

  return (
    <div className="App py-6 px-3  max-w-[390px] mx-auto  relative bg-[#f6f6f6]">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <BottomBar />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/stats"
          element={
            <>
              <Stats />
              <BottomBar />
            </>
          }
        />
        <Route
          path="/add-transaction"
          element={
            <>
              <AddTransaction />
              <BottomBar />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
