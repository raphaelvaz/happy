import React, { createContext, useContext, useState } from 'react';
import api from '../services/api';


interface User {
    name: string;
    email: string;
}

interface SignInCredentials {
    inputEmail: string;
    inputPassword: string;
}

interface AuthContextData {
    user: User;
    signIn(credentials: SignInCredentials): Promise<void>
    signOut(): void;

}
interface AuthState {
    token: string;
    user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
    const [userData, setUserData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@Happy:token');
        const user = localStorage.getItem('@Happy:user');

        if (token && user) {
            api.defaults.headers.authorization = `Bearer ${token}`

            return { token, user: JSON.parse(user) }
        }

        return {} as AuthState;
    })

    const signIn = async ({ inputEmail, inputPassword }: SignInCredentials) => {
        const response = await api.post('sessions', { email: inputEmail, password: inputPassword })

        const { token, name, email } = response.data
        const user = { name, email }

        localStorage.setItem('@Happy:token', token)
        localStorage.setItem('@Happy:user', JSON.stringify(user))

        api.defaults.headers.authorization = `Bearer ${token}`
        setUserData({ token, user });
    }

    const signOut = () => {
        localStorage.removeItem('@Happy:token')
        localStorage.removeItem('@Happy:user')

        setUserData({} as AuthState)
    }

    return (
        <AuthContext.Provider value={{ user: userData.user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be within an AuthProvider')
    }
    return context;
}

export { AuthProvider, useAuth }