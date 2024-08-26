import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants";

export const createAccountApi = async (accountData) => {
  const authToken = localStorage.getItem("authToken");

  const response = await axios.post(`${API_BASE_URL}/users`, accountData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const fetchAccountsApi = async () => {
  const authToken = localStorage.getItem("authToken");
  const response = await axios.get(`${API_BASE_URL}/accounts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const fetchAccountById = async (accountId) => {
  const authToken = localStorage.getItem("authToken");
  const response = await axios.get(`${API_BASE_URL}/accounts/${accountId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const fetchBalanceApi = async (accountId) => {
  const authToken = localStorage.getItem("authToken");
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
  const authToken = localStorage.getItem("authToken");
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
  const authToken = localStorage.getItem("authToken");
  const response = await axios.delete(`${API_BASE_URL}/accounts/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};
