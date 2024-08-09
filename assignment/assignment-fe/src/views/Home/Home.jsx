import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "../Navbar/Navbar";
import BalanceCard from "./BalanceCard";
import TransactionHistory from "./TransactionHistory";
import TransactionForm from "./TransactionForm";
import { useTheme } from "../../hooks/useTheme";
import { FaSun, FaMoon } from 'react-icons/fa';


export default function Home() {
  const { user, fetchTransactionHistory, transactionHistory } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  const [showTransferForm, setShowTransferForm] = useState(false);

  const handleTransferClick = () => {
    setShowTransferForm(!showTransferForm);
  };

  const handleTransferSubmit = (toAccountId, amount, description) => {
    console.log("Transfer submitted", { toAccountId, amount, description });
    setShowTransferForm(false);
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-[#121212]' : 'bg-gray-100'}`}>
      <Navbar />
      <div className={`flex-1 p-8 ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-[#ffffff] text-gray-900'}`}>
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleTheme}
            className="p-2 bg-gray-800 text-white rounded-full"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        <h1 className={`text-3xl font-bold mx-10 mb-10 mt-2 ${isDarkMode ? 'text-[#F4DBEF]' : 'text-gray-900'}`}>Dashboard</h1>
        <h1 className={`text-2xl font-bold mx-10 mb-10 mt-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Welcome {user.name}</h1>
        <div className="grid grid-cols-1 m-8 gap-8">
          <BalanceCard
            balance={parseInt(user.balance)}
            onTransferClick={handleTransferClick}
            isDarkMode={isDarkMode}
          />
          {showTransferForm && (
            <TransactionForm
              onSubmit={handleTransferSubmit}
              isDarkMode={isDarkMode}
            />
          )}
          <TransactionHistory
            transactions={transactionHistory}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
}