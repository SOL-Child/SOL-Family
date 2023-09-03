import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
    return (
        <Routes>
            <Route path="signup" element={<SignupPage />} />
            <Route path="login" element={<LoginPage />} />
        </Routes>
    );
}

export default App;
