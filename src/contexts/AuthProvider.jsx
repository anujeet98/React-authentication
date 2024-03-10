import { useEffect, useState } from "react"
import AuthContext from "./auth-context"


const AuthProvider = (props) => {
    const [token, setToken] = useState(null);
    useEffect(()=>{
        const lsToken = localStorage.getItem('reactAuthToken');
        if(lsToken)
            setToken(lsToken);
    },[]);
    useEffect(()=>{
        if(token)
            localStorage.setItem('reactAuthToken',token);
    },[token]);

    const addTokenHandler = (newToken) => {
        setToken(newToken);
    }

    const deleteTokenHandler = () => {
        localStorage.removeItem('reactAuthToken');
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