import PropTypes from 'prop-types';
import { useTheme } from "../../hooks/useTheme";
export default function BalanceCard({ balance, onTransferClick }) {
  const { isDarkMode } = useTheme();

  return (
    <div className={`px-8 py-6 rounded-md min-w-[300px] shadow-md border border-[#313131] bg-[#342155] ${isDarkMode ? 'bg-opacity-50' : 'bg-opacity-90 text-white'}`}>
      <p className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-white'}`}>Rs. {balance}</p>
      <h2 className={`text-xl mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>Current Balance</h2>
      <button
        onClick={() => onTransferClick()}
        className={`mt-4 px-4 py-2 rounded-md ${isDarkMode ? 'bg-[#342155] text-white' : 'bg-purple-100 text-black'} hover:bg-opacity-80`}
      >
        Transfer Money
      </button>
    </div>
  );
}

BalanceCard.propTypes = {
  balance: PropTypes.number.isRequired,
  onTransferClick: PropTypes.func.isRequired,
};
