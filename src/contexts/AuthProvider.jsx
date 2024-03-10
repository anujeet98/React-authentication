import { useState } from "react"
import AuthContext from "./auth-context"


const AuthProvider = (props) => {
    const [token, setToken] = useState(null);
    const addTokenHandler = (newToken) => {
        setToken(newToken);
    }

    const deleteTokenHandler = () => {
        setToken(null);
    }

    const authContext = {
        authToken: token,
        addToken: addTokenHandler,
        deleteToken: deleteTokenHandler,
    }

    // console.log(token);

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;