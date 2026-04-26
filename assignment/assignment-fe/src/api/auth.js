import api from "./api.js";

export const login = async (username, password) => {
  const response = await api.post(
    `/auth/login`,
    { username: username, password: password },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  const token = response.headers.get("Authorization");
  if (token) {
    const expirationTime = new Date().getTime() + 3600 * 1000;
    localStorage.setItem("authToken", token.split(" ")[1]);
    localStorage.setItem("tokenExpiration", expirationTime);
  }
  return response.data;
};

export const fetchTransactionHistoryApi = async (accountId, token) => {
  const response = await api.get(
    `/transactions/${accountId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
