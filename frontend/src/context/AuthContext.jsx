import { useState, createContext, useContext, useCallback } from 'react';
import { currentUserVar } from '../client/client';
import JWTManager from '../utils/jwt';

const defaultIsAuthenticated = false;

export const AuthContext = createContext({
    isAuthenticated: defaultIsAuthenticated,
    currentUser: null,
    setCurrentUser: () => {},
    setIsAuthenticated: () => {},
    checkAuth: () => Promise.resolve(),
    logoutClient: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        defaultIsAuthenticated
    );
    const [currentUser, setCurrentUser] = useState(currentUserVar());

    const checkAuth = useCallback(async () => {
        const token = JWTManager.getToken();
        if (token) setIsAuthenticated(true);
        else {
            const success = await JWTManager.getRefreshToken();
            if (success) {
                setIsAuthenticated(true);
                setCurrentUser(currentUserVar())
            } else {
                setCurrentUser(false);
                setIsAuthenticated(false);
            }
        }
    }, []);

    const logoutClient = () => {
        JWTManager.deleteToken();
        setIsAuthenticated(false);
    };

    const authContextData = {
        isAuthenticated,
        currentUser,
        setCurrentUser,
        setIsAuthenticated,
        checkAuth,
        logoutClient,
    };

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
