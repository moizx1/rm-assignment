import { useTheme } from '../hooks/useTheme';
import OutlinedInput from './TextField/OutlinedInput';

const AccountForm = ({ formData, onInputChange, onSubmit, onCancel, isEditing, error }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isDarkMode ? 'bg-black bg-opacity-50' : 'bg-[#ffffff] bg-opacity-50'}`}>
      <div className={`p-8 rounded-lg shadow-md w-full max-w-lg ${isDarkMode ? 'bg-[#1b1b1b] border border-[#3d3d3d]' : 'bg-[#ffffff] border border-gray-300'}`}>
        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          {isEditing ? "Edit Account" : "Add Account"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          {!isEditing ? (
            <>
              <OutlinedInput id="username" placeholder="Username" type="email" value={formData.username} onChange={onInputChange} required />
              <OutlinedInput id="password" placeholder="Password" type="password" value={formData.password} onChange={onInputChange} required />
              <OutlinedInput id="name" placeholder="Name" value={formData.name} onChange={onInputChange} required />
              <OutlinedInput id="dob" placeholder="Date of birth" type="date" value={formData.dob} onChange={onInputChange} required />
              <OutlinedInput id="address" placeholder="Address" value={formData.address} onChange={onInputChange} />
            </>
          ) : (
            <>
              <OutlinedInput id="name" placeholder="Name" value={formData.name} onChange={onInputChange} />
              <OutlinedInput id="username" placeholder="Username" type="email" value={formData.username} onChange={onInputChange} />
              <OutlinedInput id="accountNumber" placeholder="Account Number" disabled='disabled' value={formData.accountNumber} onChange={onInputChange} />
              <OutlinedInput id="balance" placeholder="Balance" disabled value={formData.balance} onChange={onInputChange} />
              <OutlinedInput id="address" placeholder="Address" value={formData.address} onChange={onInputChange} />
              <OutlinedInput id="dob" placeholder="Date of Birth" type="date" value={formData.dob} onChange={onInputChange} />
            </>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className={`text-lg px-4 py-2 mt-2 mr-4 rounded-md shadow-md ${isDarkMode ? 'bg-[#342155] text-white hover:bg-opacity-50' : 'bg-purple-800 text-white hover:bg-opacity-80'}`}
            >
              {isEditing ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className={`text-lg px-4 py-2 mt-2 rounded-md shadow-md ${isDarkMode ? 'bg-transparent text-white border border-[#3d3d3d] hover:bg-gray-700' : 'bg-transparent text-black border border-gray-300 hover:bg-gray-100'}`}
              onClick={onCancel}
            >
              Cancel
            </button>

          </div>

        </form>
        {error && <p className={`text-red-500 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>{error}</p>}
      </div>
    </div>
  );
};

export default AccountForm;
