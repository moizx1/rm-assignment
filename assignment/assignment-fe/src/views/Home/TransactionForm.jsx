import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { toast } from 'react-toastify';
import { getAccountDetails, submitTransaction } from "../../api/transaction";
import { validateBankAccountNumber } from "../../utils/validate";
import OutlinedInput from "../../components/TextField/OutlinedInput";
import ConfirmationDialog from "../../components/ConfirmationDialog";

export default function TransactionForm({ onSubmit }) {
  const { isDarkMode } = useTheme();
  const { fetchTransactionHistory } = useAuth();
  const storageUser = localStorage.getItem("user");
  const user = JSON.parse(storageUser);
  const [formData, setFormData] = useState({
    toAccountNumber: "",
    amount: "",
    description: ""
  });
  const [toAccountId, setToAccountId] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  const [isConfirmation, setIsConfirmation] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleLookup = async () => {
    try {
      setError("");
      const { toAccountNumber } = formData;
      if (!validateBankAccountNumber(toAccountNumber)) {
        setError("Bank account number must be exactly 10 digits.");
        return;
      }
      const details = await getAccountDetails(toAccountNumber);
      const newToAccountId = details.data.toAccountId;
      setAccountDetails(details.data);
      setToAccountId(newToAccountId);
      if (user.accountId === newToAccountId) {
        setAccountDetails(null);
        setError("Cannot transfer money to your own account.");
        return;
      } else {
        setIsConfirmation(true);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching account details.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isConfirmation) {
      setShowConfirmationDialog(true);
    } else {
      await handleLookup();
    }
  };

  const handleConfirm = async () => {
    try {
      await submitTransaction(user.accountId, toAccountId, formData.amount, formData.description);
      fetchTransactionHistory();
      resetForm();
      toast.success('Transaction successful!');
      onSubmit();
    } catch (error) {
      setError(error.response?.data || "Error submitting transaction.");
      toast.error('Failed to process transaction.');
    }
    setShowConfirmationDialog(false);
  };

  const handleCancel = () => {
    setShowConfirmationDialog(false);
  };

  const resetForm = () => {
    setFormData({
      toAccountNumber: "",
      amount: "",
      description: ""
    });
    setToAccountId(null);
    setAccountDetails(null);
    setIsConfirmation(false);
    setError("");
  };

  const renderForm = () => (
    <>
      <OutlinedInput
        type="text"
        id="toAccountNumber"
        placeholder="To Account Number"
        value={formData.toAccountNumber}
        onChange={handleInputChange}
        required
        className={`${
          isDarkMode
            ? "bg-[#2e2e2e] text-gray-200"
            : "bg-gray-100 text-gray-800"
        } border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
      />
      <OutlinedInput
        type="number"
        id="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleInputChange}
        required
        className={`${
          isDarkMode
            ? "bg-[#2e2e2e] text-gray-200"
            : "bg-gray-100 text-gray-800"
        } border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
      />
      <OutlinedInput
        type="text"
        id="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleInputChange}
        className={`${
          isDarkMode
            ? "bg-[#2e2e2e] text-gray-200"
            : "bg-gray-100 text-gray-800"
        } border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
      />
      {error && (
        <p
          className={`text-red-500 ${
            isDarkMode ? "text-red-400" : "text-red-600"
          }`}
        >
          {error}
        </p>
      )}
    </>
  );

  const renderConfirmation = () => (
    <div>
      <div className="flex">
        <strong
          className={`w-40 ${
            isDarkMode ? "text-gray-300" : "text-gray-800"
          }`}
        >
          Account Name:
        </strong>
        <span
          className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
        >
          {accountDetails.name}
        </span>
      </div>
      <div className="flex">
        <strong
          className={`w-40 ${
            isDarkMode ? "text-gray-300" : "text-gray-800"
          }`}
        >
          Amount:
        </strong>
        <span
          className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
        >
          {formData.amount}
        </span>
      </div>
      {error && (
        <p
          className={`text-center mt-6 text-red-500 ${
            isDarkMode ? "text-red-400" : "text-red-600"
          }`}
        >
          {error}
        </p>
      )}
    </div>
  );

  return (
    <div
      className={`border w-full min-w-[300px] px-8 py-6 ${
        isDarkMode
          ? "bg-[#1b1b1b] border-[#313131]"
          : "bg-[#ffffff] border-gray-300"
      } rounded-lg shadow-md bg-opacity-50`}
    >
      <h2
        className={`text-2xl font-bold text-center mb-8 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Transfer Money
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {!isConfirmation ? renderForm() : renderConfirmation()}
        <button
          type="submit"
          className={`w-full py-3.5 rounded-md ${
            isDarkMode
              ? "bg-[#342155] text-white"
              : "bg-[#342155] bg-opacity-85 text-white"
          } shadow-md`}
        >
          {isConfirmation ? "Confirm" : "Submit"}
        </button>
      </form>
      {showConfirmationDialog && (
        <ConfirmationDialog
          message="Are you sure you want to proceed with this transaction?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
