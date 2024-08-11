import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants";

const authToken = localStorage.getItem("authToken");

export const createAccountApi = async (accountData) => {
  const response = await axios.post(`${API_BASE_URL}/users`, accountData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const token = response.headers.get("Authorization");
  console.log(token);
  if (token) {
    const expirationTime = new Date().getTime() + 3600 * 1000;
    localStorage.setItem("authToken", token);
    localStorage.setItem("tokenExpiration", expirationTime);
  }
  return response.data;
};

export const fetchAccountsApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/accounts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const fetchAccountById = async (accountId) => {
  const response = await axios.get(`${API_BASE_URL}/accounts/${accountId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const fetchBalanceApi = async (accountId) => {
  // console.log(authToken)
  const response = await axios.get(
    `${API_BASE_URL}/accounts/${accountId}/balance`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return response.data;
};

export const updateAccountApi = async (accountData) => {
  const response = await axios.patch(
    `${API_BASE_URL}/accounts/${accountData.userId}`,
    accountData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return response.data;
};

export const deleteAccountApi = async (userId) => {
  const response = await axios.delete(`${API_BASE_URL}/accounts/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};
