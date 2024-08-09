/* eslint-disable react/prop-types */
import { useTheme } from '../hooks/useTheme';

const AccountTable = ({ accounts, onEdit, onDelete }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="overflow-x-auto">
      {accounts.length > 0 ? (
        <table className={`min-w-full divide-y ${isDarkMode ? 'divide-[#3d3d3d] bg-[#1b1b1b]' : 'divide-gray-300 bg-[#ffffff]'} rounded-xl shadow-lg`}>
          <thead className={` ${isDarkMode ? 'bg-[#342155] bg-opacity-35' : 'bg-[#342155] bg-opacity-85'}`}>
            <tr>
              <th className={`px-6 py-3 text-left text-s font-bold ${isDarkMode ? 'text-gray-300' : 'text-white'} uppercase tracking-wider`}>Name</th>
              <th className={`px-6 py-3 text-left text-s font-bold ${isDarkMode ? 'text-gray-300' : 'text-white'} uppercase tracking-wider`}>Username</th>
              <th className={`px-6 py-3 text-left text-s font-bold ${isDarkMode ? 'text-gray-300' : 'text-white'} uppercase tracking-wider`}>Account Number</th>
              <th className={`px-6 py-3 text-left text-s font-bold ${isDarkMode ? 'text-gray-300' : 'text-white'} uppercase tracking-wider`}>Balance</th>
              <th className={`px-6 py-3 text-left text-s font-bold ${isDarkMode ? 'text-gray-300' : 'text-white'} uppercase tracking-wider`}>Address</th>
              <th className={`px-6 py-3 text-left text-s font-bold ${isDarkMode ? 'text-gray-300' : 'text-white'} uppercase tracking-wider`}>Date of Birth</th>
              <th className={`px-6 py-3 text-left text-s font-bold ${isDarkMode ? 'text-gray-300' : 'text-white'} uppercase tracking-wider`}>Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-gray-800' : 'divide-gray-200'}`}>
            {accounts.map((account, index) => (
              <tr className={index % 2 === 0 ? (isDarkMode ? 'bg-transparent' : 'bg-gray-100 bg-opacity-50') : (isDarkMode ? 'bg-gray-700 bg-opacity-15' : 'bg-gray-200 bg-opacity-80')} key={account.accountId}>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{account.name}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{account.username}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{account.accountNumber}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{account.balance}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{account.address}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{account.dob}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  <button
                    className={`px-2 py-1 mr-2 rounded-md shadow-sm ${isDarkMode ? 'bg-gray-800 text-white border border-[#3d3d3d] hover:bg-gray-700' : 'bg-transparent text-black border border-gray-400 hover:bg-gray-400'}`}
                    onClick={() => onEdit(account)}
                  >
                    Edit
                  </button>
                  <button
                    className={`px-2 py-1 rounded ${isDarkMode ? 'bg-red-600 bg-opacity-80 text-white hover:bg-red-500' : 'bg-red-400 text-white hover:bg-red-500'}`}
                    onClick={() => onDelete(account.accountId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No accounts found.</p>
      )}
    </div>
  );
};

export default AccountTable;
