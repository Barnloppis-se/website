"use client"
import { Auth, User } from "@barnloppis-se/api/auth";
import { Account } from "@barnloppis-se/types/dist/src/data/account";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

/**
 * Authentication state type
 */
type State = {
    /**
     * User object
     */
    readonly user?: User

    /**
     * Logs in to account
     *
     * @param account Account details
     */
    readonly login: (account: Account) => Promise<User | undefined>

    /**
     * Logs out of currently logged in account
     */
    readonly logout: () => void
}

/**
 * Authentication context
 */
const context = createContext<State>({ login: async (a) => {}, logout: () => {} });



/**
 * Authentication provider
 */
export default function AuthProvider({ children }: { children: ReactNode }): ReactNode {
    const [ state, setState ] = useState<State>({ login: async (a) => {}, logout: () => {} });

    const login = async (account: Account) => {
        const res = await Auth.login(account);
        if(res.status === false) {
            setState({ user: null, login, logout });
            return;
        } else {
            setState({ user: { token: res.user!.token }, login, logout });
            return res.user;
        }
    }

    const logout = () => {
        Auth.logout();
        setState({ user: null, login, logout });
    }

    useEffect(() => {
        Auth.init()
        setState({ user: Auth.getUser(), login, logout });
    }, []);

    return(
        <context.Provider value={state}>
            {children}
        </context.Provider>
    );
}



/**
 * Gets the authentication object for the
 * current object context.
 *
 * @returns Authentication context object
 */
export const useAuth = () => useContext(context);
