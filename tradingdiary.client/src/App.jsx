import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NoPage from './pages/NoPage/NoPage';
import Trades from './pages/Trades/Trades';
import Statistics from './pages/Statistics/Statistics';
import Settings from './pages/Settings/Settings';
import ResetPassword from './pages/ReserPassword/ResetPassword';
import EntryFactors from './pages/EntryFactors/EntryFactors';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/resetpassword/:token" element={<ResetPassword />} />
                    <Route path="/trades" element={<Trades />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/settings/factors" element={<EntryFactors />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default App
