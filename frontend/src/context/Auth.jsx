import { useContext } from "react";
import { createContext } from "react";

let AuthContext = createContext()

let AuthProvider = ({ children }) => {
    let name = "Kiran"
    return (
        <AuthContext.Provider value={{ name }}>
            {children}
        </AuthContext.Provider>
    )
}

// export let useAuth = useContext(AuthContext)

export let useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider;