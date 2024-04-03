import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const checkAuth = () => {
        if (token == null) {
            navigate("/login");
        } else {
            checkToken();
        }
    }

    return (
        <AuthContext.Provider value={[token, checkAuth]}>
            {props.children}
        </AuthContext.Provider>
    );

    async function checkToken() {
        const responce = await fetch('/api/Authentication/jwt-token', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await responce.text();
        console.log(data);
        localStorage.setItem("token", data)
    }
};