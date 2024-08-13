import {jwtDecode} from "jwt-decode";

export function isAdmin(token){
    const arrayToken = token.split('.');
    const payload = JSON.parse(atob(arrayToken[1]));
    return payload.role === 1;
}

export function getToken(){
    const token =  localStorage.getItem('token');
    if(!token){
        return null;
    }
    if(isTokenExpired(token)) {
        localStorage.removeItem('token');
        return null;
    }
    return token;
}

const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
}

