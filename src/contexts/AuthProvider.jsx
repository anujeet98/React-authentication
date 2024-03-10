import { useEffect, useState } from "react"
import AuthContext from "./auth-context"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const AuthProvider = (props) => {
    const initialToken = localStorage.getItem('reactAuthToken');
    const [token, setToken] = useState(initialToken);
    const history = useHistory();

    useEffect(()=>{
        const expiryTime = localStorage.getItem('reactAuthToken-expiresIn');
        if(expiryTime && expiryTime<new Date().getTime())
        {
            deleteTokenHandler();
            alert('token expired, kindly login again');
            history.push('/auth');
        }
    });

    const addTokenHandler = (newToken, expiresIn) => {
        const date = new Date().getTime()+(expiresIn*1000);
        localStorage.setItem('reactAuthToken-expiresIn',date);
        localStorage.setItem('reactAuthToken',newToken);
        setToken(newToken);
    }

    const deleteTokenHandler = () => {
        localStorage.removeItem('reactAuthToken');
        localStorage.removeItem('reactAuthToken-expiresIn');
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