import { Auth } from "@barnloppis-se/api/auth";
import { Account } from "@barnloppis-se/types/dist/src/data/account";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

/**
 * Authentication state type
 */
type State = {
    /**
     * User object
     */
    user?: {
        /**
         * Account access token
         */
        token: {
            /**
             * Token value
             */
            value: string,
            /**
             * Token expire date
             */
            expires: Date
        }
    }

    /**
     * Logs in to account
     *
     * @param account Account details
     */
    readonly login?: (account: Account) => Promise<void>

    /**
     * Logs out of currently logged in account
     */
    readonly logout?: () => void
}

/**
 * Authentication context
 */
const context = createContext<State>({})



export default function AuthProvider({ children }: { children: ReactNode }): ReactNode {
    const [ state, setState ] = useState<State>({})

    const login = async (account: Account) => {
        const res = await Auth.login(account)
        {
        }
    }

    useEffect(() => {
        Auth.init()
    }, []);

    return(
        <context.Provider value={{}}>
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
export const useAuth = () => useContext(context)
