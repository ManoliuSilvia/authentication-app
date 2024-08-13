import {createContext, useState} from "react";
import {getToken} from "../util/auth-util";

export const AuthContext = createContext({
    token: '',
    setToken: (value) =>{},
    handleSaveToken: (value) =>{},
    handleRemoveToken: ()=>{}
})

export default function AuthContextProvider({children}){
    const auxToken = getToken();
    const [token, setToken] = useState(auxToken);

    function handleSaveToken(value){
        console.log(value)
        setToken(value);
        localStorage.setItem('token',value);
    }
    function handleRemoveToken(){
        setToken(null);
        localStorage.removeItem('token');
    }

    const ctxValue = {
        token,
        setToken: setToken,
        handleSaveToken,
        handleRemoveToken
    }

    return (
        <AuthContext.Provider value={ctxValue}>
            {children}
        </AuthContext.Provider>
    )
}