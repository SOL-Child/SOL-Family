import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import TransferPage from './pages/TransferPage/TransferPage';
import AutoTransferPage from './pages/AutoTransferPage/AutoTransferPage';
import AccountConnectPage from './pages/AccountConnectPage/AccountConnectPage';
import LoanRequestPage from './pages/LoanRequestPage/LoanRequestPage';

function App() {
    return (
        <Routes>
            <Route path="signup" element={<SignupPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="" element={<MainPage />} />
            <Route path="account/transfer" element={<TransferPage />} />
            <Route path="account/autotransfer" element={<AutoTransferPage />} />
            <Route path="account/connect" element={<AccountConnectPage />} />
            <Route path="loan/request" element={<LoanRequestPage />} />
        </Routes>
    );
}

export default App;
