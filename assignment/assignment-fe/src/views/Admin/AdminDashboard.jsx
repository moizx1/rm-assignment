import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth"
import { useTheme } from "../../hooks/useTheme";
import { toast } from 'react-toastify';
import { fetchAccountsApi, createAccountApi, updateAccountApi, deleteAccountApi } from "../../api/account";
import { getCurrentLocalDateTime, validateForm, resetForm } from "../../utils/utils";
import AccountTable from "../../components/AccountTable";
import AccountForm from "../../components/AccountForm";
import Navbar from "../Navbar/Navbar";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import ConfirmationDialog from "../../components/ConfirmationDialog";

const AdminDashboard = () => {
  const { isDarkMode } = useTheme();
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState("");
  const [editingAccount, setEditingAccount] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const { user } = useAuth();
  const [formData, setFormData] = useState(resetForm());

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await fetchAccountsApi();
      setAccounts(response);
    } catch (error) {
      console.log("Failed to fetch accounts.", error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleAddClick = () => {
    setFormData(resetForm());
    setEditingAccount(null);
    setShowForm(true);
  };

  const handleEditClick = (account) => {
    setError("");
    setFormData(account);
    setEditingAccount(account.accountId);
    setShowForm(true);
  };

  const handleDeleteClick = (account) => {
    setAccountToDelete(account);
  };

  const confirmDelete = async () => {
    try {
      await deleteAccountApi(accountToDelete, user.token);
      setAccounts(
        accounts.filter((account) => account.accountId !== accountToDelete.accountId)
      );
      fetchAccounts();
      toast.success('Account deleted successfully!', {className: 'bg-gray-900 bg-opacity-50 text-white'});
    } catch (error) {
      setError(error.response?.data);
      toast.error('Failed to delete account.', {className: 'bg-gray-900 bg-opacity-50 text-white'});
    }
    setAccountToDelete(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm(formData, !!editingAccount);
    if (validationError) {
      toast.error(validationError, {className: 'bg-gray-900 bg-opacity-50 text-white'});
      return;
    }
    try {
      if (editingAccount) {
        await updateAccountApi(formData);
        setAccounts(
          accounts.map((account) =>
            account.accountId === editingAccount ? formData : account
          )
        );
        toast.success('Account updated successfully!', {className: 'bg-gray-900 bg-opacity-50 text-white'});
      } else {
        const newFormData = { ...formData, createdAt: getCurrentLocalDateTime() };
        const response = await createAccountApi(newFormData, user.token);
        setAccounts([...accounts, response]);
        fetchAccounts();
        toast.success('Account created successfully!', {className: 'bg-gray-900 bg-opacity-50 text-white'});
      }
      setShowForm(false);
      setFormData(resetForm());
    } catch (error) {
      setError(error.response?.data);
      toast.error('Failed to process account.', {className: 'bg-gray-900 bg-opacity-50 text-white'});
    }
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-gray-100 text-black'}`}>
      <Navbar />
      <div className="flex-1 p-8">
        <div className="absolute top-4 right-4">
          <ThemeToggleButton />
        </div>
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <button
          className={`py-2 px-3 mb-4 rounded-md shadow-md ${isDarkMode ? 'bg-[#342155] text-white' : 'bg-[#342155] bg-opacity-85 text-white'} font-normal hover:bg-opacity-50`}
          onClick={handleAddClick}
        >
          Add Account
        </button>
        <div className={`h-lvh border ${isDarkMode ? 'border-[#3d3d3d] bg-[#1b1b1b]' : 'border-gray-300 bg-[#ffffff]'} px-4 py-6 rounded-lg shadow-md bg-opacity-40`}>
          {showForm && (
            <AccountForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
              isEditing={!!editingAccount}
              error={error}
            />
          )}
          <AccountTable
            accounts={accounts}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
          {error && <p className={`text-red-500 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>{error}</p>}
          {accountToDelete && (
            <ConfirmationDialog
              message="Are you sure you want to delete this account?"
              onConfirm={confirmDelete}
              onCancel={() => setAccountToDelete(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;