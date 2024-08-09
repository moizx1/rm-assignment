import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "../Navbar/Navbar";
import TransactionHistory from "../Home/TransactionHistory";
import { useTheme } from '../../hooks/useTheme';
import { FaSun, FaMoon } from 'react-icons/fa';


const AccountDetailsPage = () => {
  const { user, fetchTransactionHistory, transactionHistory } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme(); 

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-[#121212]' : 'bg-gray-100'}`}>
      <Navbar />
      <div className={`flex-1 p-8 w-4/5 ${isDarkMode ? 'bg-[#121212]' : 'bg-[#ffffff]'}`}>
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleTheme}
            className="p-2 bg-gray-800 text-white rounded-full"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        <h1 className={`text-3xl font-bold mx-2 mb-10 mt-2 ${isDarkMode ? 'text-[#F4DBEF]' : 'text-gray-900'}`}>Account Details</h1>
        <div className={`flex flex-col md:flex-row space-4 px-8 py-6 mb-8 gap-16 rounded-lg shadow-sm border ${isDarkMode ? 'border-[#3d3d3d] bg-[#1b1b1b]' : 'border-gray-300 bg-white'}`}>
          <div className="flex flex-col w-full md:w-1/2 space-y-4 pr-14">
              <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-[#F4DBEF]' : 'text-gray-900'}`}>Personal Information</h2>    
                <div className="flex">
                  <strong className={`w-40 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>Name:</strong>
                  <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{user.name}</span>
                </div>
                <div className="flex">
                  <strong className={`w-40 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>Username:</strong>
                  <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{user.username}</span>
                </div>
                <div className="flex">
                  <strong className={`w-40 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>User ID:</strong>
                  <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{user.userId}</span>
                </div>
            </div>
            <div className="flex flex-col w-full md:w-1/2 space-y-4 pr-14">
              <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-[#F4DBEF]' : 'text-gray-900'}`}>Account Information</h2>
            
                <div className="flex">
                  <strong className={`w-40 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>Account Number:</strong>
                  <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{user.accountNumber}</span>
                </div>
                <div className="flex">
                  <strong className={`w-40 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>Account ID:</strong>
                  <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{user.accountId}</span>
                </div>
                <div className="flex">
                  <strong className={`w-40 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>Balance:</strong>
                  <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Rs. {user.balance}</span>
                </div>
            </div>
        </div>
        <TransactionHistory transactions={transactionHistory} />
      </div>
    </div>
  );
};

export default AccountDetailsPage;
