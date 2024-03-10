import React from "react";


const AuthContext = React.createContext({
        token: null,
        addToken: () => {},
        deleteToken: () => {},
});

export default AuthContext;