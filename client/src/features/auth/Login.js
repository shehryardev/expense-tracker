import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
const Login = () => {
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          token: credentialResponse.credential,
        }
      );

      if (!response?.data?.success) {
        throw new Error("Something went wrong");
      }

      localStorage.setItem("access_token", response?.data?.data?.access_token); // Store app-specific token
      window.location.href = "/";
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  return (
    <div className="mx-auto w-60">
      <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log("Login Failed")}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
