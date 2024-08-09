/* eslint-disable react/prop-types */
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  const showAlert = () => {
    confirmAlert({
      overlayClassName: 'bg-gray-900 bg-opacity-50',
      closeOnClickOutside: false,
      closeOnEscape: false,
      customUI: ({ onClose }) => {
        return (
          <div className="bg-gray-600 bg-opacity-40 rounded-md shadow-lg px-8 py-4">
            <h1 className='mb-3 font-bold'>Confirm Action</h1>
            <p>{message}</p>
            <div className='flex mt-8 space-x-2 justify-end'>
              <button
                className="bg-gray-900 hover:bg-purple-800 rounded-md shadow-lg px-4 py-2"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                Yes
              </button>
              <button
                className="bg-gray-900 hover:bg-purple-800 rounded-md shadow-lg px-4 py-2"
                onClick={() => {
                  if (onCancel) onCancel();
                  onClose();
                }}
              >
                No
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return <>{showAlert()}</>;
};

export default ConfirmationDialog;
