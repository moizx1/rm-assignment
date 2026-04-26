import api from "./api.js";

export const createAccountApi = async (accountData) => {
  const authToken = localStorage.getItem("authToken");

  const response = await api.post(`/users`, accountData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const fetchAccountsApi = async () => {
  const authToken = localStorage.getItem("authToken");
  const response = await api.get(`/accounts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const fetchAccountById = async (accountId) => {
  const authToken = localStorage.getItem("authToken");
  const response = await api.get(`/accounts/${accountId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const fetchBalanceApi = async (accountId) => {
  const authToken = localStorage.getItem("authToken");
  const response = await api.get(
    `/accounts/${accountId}/balance`,
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
  const response = await api.patch(
    `/accounts/${accountData.userId}`,
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
  const response = await api.delete(`/accounts/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};
