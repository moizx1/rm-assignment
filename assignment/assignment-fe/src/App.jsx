import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './views/Home/Home.jsx';               
import Login from './views/Auth/Login.jsx';
import Register from './views/Auth/Register.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './views/Admin/AdminDashboard.jsx';  
import AccountDetails from './views/AccountDetails/AccountDetails.jsx';

function App() {
  return (
    <div className="App">
      <ToastContainer />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoute role={'USER'}><Home /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute role={'ADMIN'}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/account-details" element={<ProtectedRoute role={'USER'}><AccountDetails /></ProtectedRoute>} />
    </Routes>
    </div>
  );
}

export default App;
