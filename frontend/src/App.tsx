import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import TransferPage from './pages/TransferPage/TransferPage';
import AutoTransferPage from './pages/AutoTransferPage/AutoTransferPage';
import AccountConnectPage from './pages/AccountConnectPage/AccountConnectPage';
import LoanRequestPage from './pages/LoanRequestPage/LoanRequestPage';
import FundPage from './pages/FundPage/FundPage';
import TransactionPage from './pages/TransactionPage/TransactionPage';
import AlarmPage from './pages/AlarmPage/AlarmPage';
import './firebase-messaging-sw.js';

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
            <Route path="fund" element={<FundPage />} />
            <Route path="account/transaction" element={<TransactionPage />} />
            <Route path="alarm" element={<AlarmPage />} />
        </Routes>
    );
}

export default App;
