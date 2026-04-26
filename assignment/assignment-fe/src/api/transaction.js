import api from "./api.js";

export const submitTransaction = async (
  fromAccountId,
  toAccountId,
  amount,
  description
) => {
  const token = localStorage.getItem("authToken");
  const response = await api.post(
    `/transactions`,
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
    const response = await api.get(
      `/accounts/${accountNumber}/details`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
};
