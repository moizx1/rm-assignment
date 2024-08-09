import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants";

const token = localStorage.getItem("authToken");

export const createAccountApi = async (accountData) => {
  const response = await axios.post(`${API_BASE_URL}/user`, accountData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchAccountsApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/account`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateAccountApi = async (accountData) => {
  console.log(accountData);
  const response = await axios.put(
    `${API_BASE_URL}/account/update`,
    accountData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteAccountApi = async (userId) => {
  const response = await axios.delete(`${API_BASE_URL}/account/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
