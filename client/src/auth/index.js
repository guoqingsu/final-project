import {createContext, useState, useContext} from 'react';

const AuthContext = createContext();

const useAuth = () => {
    const authed = Boolean(localStorage.getItem('token'));
    const [authenticated, setAuthenticated] = useState(authed);
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    return {
        username,
        authenticated,
        login(token, username) {
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            return new Promise(res => {
                setAuthenticated(true);
                setUsername(username);
                res();
            })
        },
        logout() {
            localStorage.setItem('token', '');
            return new Promise(res => {
                setAuthenticated(false);
                res();
            })
        }
    }
}

export const AuthProvider = ({children}) => {
    const auth = useAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export default function AuthConsumer() {
    return useContext(AuthContext);
}