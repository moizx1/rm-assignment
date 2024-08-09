import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi, fetchTransactionHistoryApi } from "../api/auth";
import { createAccountApi } from "../api/account";
import { getAccountDetails } from "../api/transaction";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          userId: null,
          username: null,
          name: null,
          accountId: null,
          accountNumber: null,
          balance: null,
          role: null,
          token: localStorage.getItem("authToken"),
        };
  });

  const isAdmin = user && user.role === "ADMIN";

  const login = async (username, password) => {
    try {
      const response = await loginApi(username, password);
      const token = response["jwt"];
      const expirationTime = new Date().getTime() + 3600 * 1000;
      localStorage.setItem("authToken", token);
      localStorage.setItem("tokenExpiration", expirationTime);
      const newUser = { ...response, token };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      setMessage("Login successful");
      toast.success("Login successful!", {className: 'bg-gray-900 bg-opacity-50 text-white'});
      if (newUser.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setMessage("Invalid username or password");
    }
  };

  const register = async ( username,password, name, dob, address, createdAt ) => {
    try {
      const userData = { username, password, name, dob, address, createdAt };
      const response = await createAccountApi(userData);
      const token = response["jwt"];
      const expirationTime = new Date().getTime() + 3600 * 1000;
      localStorage.setItem("authToken", token);
      localStorage.setItem("tokenExpiration", expirationTime);
      const newUser = { ...response, token };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      setMessage("Registration successful");
      toast.success("User Registered", {className: 'bg-gray-900 bg-opacity-50 text-white'});
      navigate("/");
    } catch (error) {
      console.log(error);
      setMessage(
        setMessage(error.response.message) ||
          "Registration failed. Please try again."
      );
    }
  };

  const saveAccountDetails = (accountId, accountNumber) => {
    const updatedUser = { ...user, accountId, accountNumber };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const fetchTransactionHistory = async () => {
    try {
      const response = await fetchTransactionHistoryApi(
        user.accountId,
        user.token
      );
      setTransactionHistory(response);
      const updatedDetails = await getAccountDetails(user.accountNumber);
      const updatedUser = { ...user, balance: updatedDetails.data.balance };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Failed to fetch transaction history", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("user");
    setUser({
      userId: null,
      username: null,
      name: null,
      accountId: null,
      accountNumber: null,
      role: null,
      token: null,
    });
    navigate("/login");
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const expirationTime = localStorage.getItem("tokenExpiration");
      if (expirationTime && new Date().getTime() > expirationTime) {
        logout();
      }
    };

    checkTokenExpiration();

    const intervalId = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        message,
        fetchTransactionHistory,
        transactionHistory,
        logout,
        saveAccountDetails,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
