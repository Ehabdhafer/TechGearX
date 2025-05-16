import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie';


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authToken, setAuthToken] = useState(Cookies.get("access_token") || null);

    const login = (token) => {
        setAuthToken(token);
        Cookies.set('access_token',token);
    };

    const logout = () => {
        setAuthToken(null);
        Cookies.remove('access_token');
    };

    const isAuthenticated = () => {
        return !!authToken;
    };

    return(
        <AuthContext.Provider
        value={{authToken,login,logout,isAuthenticated}}
        >
            {children}
            
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};