import axios from "axios";
import { API_BASE_URL as BASE_URL } from "../constants/apiConstants"

export const submitTransaction = async (
  fromAccountId,
  toAccountId,
  amount,
  description
) => {
  const token = localStorage.getItem("authToken");
  const response = await axios.post(
    `${BASE_URL}/transaction/submit`,
    {
      toAccountId,
      fromAccountId,
      date: new Date(),
      description,
      amount,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getAccountDetails = async (accountNumber) => {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `${BASE_URL}/account/details/${accountNumber}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
};
