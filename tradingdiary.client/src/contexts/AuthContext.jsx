import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
    const [token, setToken] = useState({ token: "" });

    return (
        <AuthContext.Provider value={[ token, setToken ]}>
            {props.children}
        </AuthContext.Provider>
    );
};