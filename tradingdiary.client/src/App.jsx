import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import NoPage from './NoPage';
import Trades from './Trades';
import Statistics from './Statistics';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/trades" element={<Trades />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default App
