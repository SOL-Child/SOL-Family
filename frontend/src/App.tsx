import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import TransferPage from './pages/TransferPage/TransferPage';
import AutoTransferPage from './pages/AutoTransferPage/AutoTransferPage';

function App() {
    return (
        <Routes>
            <Route path="signup" element={<SignupPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="" element={<MainPage />} />
            <Route path="account/transfer" element={<TransferPage />} />
            <Route path="account/autotransfer" element={<AutoTransferPage />} />
        </Routes>
    );
}

export default App;
