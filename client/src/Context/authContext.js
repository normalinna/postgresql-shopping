import { createContext } from "react"

export const AuthContext = createContext(
    { authState: {id: '', email: '', role: null, signedIn: false }, setAuthState: () => {} }
)
