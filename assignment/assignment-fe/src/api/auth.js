import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants"

export const login = async (username, password) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/login`,
    { username: username, password: password },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const fetchTransactionHistoryApi = async (accountId, token) => {
  const response = await axios.get(`${API_BASE_URL}/transaction/${accountId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
