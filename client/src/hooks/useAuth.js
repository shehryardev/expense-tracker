import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3001/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Dispatch the setCredentials action to update the Redux store
        dispatch(setCredentials({ user: response.data.data }));
      } catch (error) {
        navigate("/login");
        console.error("Error verifying token:", error);
        // Handle token verification failure
      }
    };

    verifyUser();
  }, [dispatch]);

  // The hook no longer needs to return anything as the state is managed by Redux
};

export default useAuth;
