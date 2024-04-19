import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../api/AuthService';

export const AuthContext = createContext(null);

let token

export const AuthProvider = (props) => {
    const navigate = useNavigate();
    token = localStorage.getItem("token");

    const checkAuth = async () => {
        if (token == null) {
            navigate("/login");
        } else {
            await service.checkToken();
        }
    }

    return (
        <AuthContext.Provider value={[checkAuth]}>
            {props.children}
        </AuthContext.Provider>
    );
};

export { token } 