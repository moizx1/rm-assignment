import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants";

export const login = async (username, password) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/login`,
    { username: username, password: password },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  const token = response.headers.get("Authorization");
  console.log(token);
  if (token) {
    const expirationTime = new Date().getTime() + 3600 * 1000;
    localStorage.setItem("authToken", token);
    localStorage.setItem("tokenExpiration", expirationTime);
  }
  return response.data;
};

export const fetchTransactionHistoryApi = async (accountId, token) => {
  const response = await axios.get(
    `${API_BASE_URL}/transactions/${accountId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
