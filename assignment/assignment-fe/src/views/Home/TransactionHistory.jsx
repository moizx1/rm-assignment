/* eslint-disable react/prop-types */
import { useTheme } from '../../hooks/useTheme'; // Adjust the path as necessary

const TransactionHistory = ({ transactions }) => {
  const { isDarkMode } = useTheme();

  const groupTransactionsByDate = (transactions) => {
    const groupedTransactions = {};
    transactions.forEach((transaction) => {
      const date = transaction.date.split("T")[0];
      if (!groupedTransactions[date]) {
        groupedTransactions[date] = [];
      }
      groupedTransactions[date].push(transaction);
    });
    return groupedTransactions;
  };

  const sortTransactionsByDate = (groupedTransactions) => {
    const sortedDates = Object.keys(groupedTransactions).sort((a, b) => new Date(b) - new Date(a));
    const sortedTransactions = [];
    sortedDates.forEach((date) => {
      sortedTransactions.push({
        date,
        transactions: groupedTransactions[date],
      });
    });
    return sortedTransactions;
  };

  const renderTime = (dateString) => {
    const time = dateString.split("T")[1].split(".")[0]; // Extract time part from ISO string
    const date = new Date(`1970-01-01T${time}Z`);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  const getTransactionType = (dbCrIndicator) => {
    return dbCrIndicator === "CR" ? " (Credit)" : " (Debit)";
  };

  if (!Array.isArray(transactions)) {
    transactions = [];
  }

  const groupedTransactions = groupTransactionsByDate(transactions);
  const sortedTransactions = sortTransactionsByDate(groupedTransactions);

  return (
    <div className={`min-w-[300px] py-6 px-4 rounded-md shadow-sm border ${isDarkMode ? 'bg-[#1b1b1b] border-[#313131]' : 'bg-[#ffffff] border-gray-300'} bg-opacity-50`}>
      <h2 className={`text-2xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Transaction History
      </h2>
      {transactions.length === 0 ? (
        <p className={`text-center mt-14 mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No transactions available
        </p>
      ) : (
        sortedTransactions.map((group) => (
          <div key={group.date} className="ml-2 mb-4">
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}>
              {group.date}
            </h3>
            <ul>
              {group.transactions.reverse().map((transaction) => (
                <li
                  key={transaction.transactionId}
                  className={`mb-2 ml-4 mr-8 pt-2 flex justify-between ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
                >
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 ${transaction.dbCrIndicator === "CR" ? 'text-green-500' : 'text-red-500'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d={
                          transaction.dbCrIndicator === "CR"
                            ? "M16.707 8.293a1 1 0 0 0-1.414 0L10 13.586l-5.293-5.293a1 1 0 1 0-1.414 1.414l6 6a1 1 0 0 0 1.414 0l6-6a1 1 0 0 0 0-1.414z"
                            : "M3.293 11.707a1 1 0 0 0 1.414 0L10 6.414l5.293 5.293a1 1 0 1 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 0 1.414z"
                        }
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <div>
                        {transaction.toFromName}{" "}
                        {getTransactionType(transaction.dbCrIndicator)}
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {renderTime(transaction.date)}
                      </div>
                    </div>
                  </div>
                  <h4 className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    Rs. {transaction.amount}
                  </h4>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionHistory;
