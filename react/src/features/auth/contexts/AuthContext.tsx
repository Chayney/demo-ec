import { createContext, type FC, type ReactNode } from "react";
import type { UserType } from "../types/auth";
import { useAuth } from "../hooks/useAuth";

type AuthContextProps = {
    children: ReactNode
}

type AuthContextType = {
    user: UserType | null,
    isAuth: boolean,
    signin: (user: UserType, token: string) => void,
    signout: () => void
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuth: false,
    signin: () => { },
    signout: () => { }
})

export { AuthContext }

export const AuthProvider: FC<AuthContextProps> = ({ children }) => {
    const { 
        user,
        isAuth,
        signin,
        signout
    } = useAuth();

    return (
        <AuthContext.Provider value={{
            user,
            isAuth,
            signin,
            signout
        }}>
            {children}
        </AuthContext.Provider>
    )
}