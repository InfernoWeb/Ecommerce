import { useState, createContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import axios from 'axios'
import { API_ENDPOINT } from "../components/config";
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const authCookie = localStorage.getItem('auth')?JSON.parse(localStorage.getItem('auth')): null;
    const [user, setUser] = useState(authCookie ? jwt_decode(authCookie.accessToken) : null )
    const [token, setToken] = useState(authCookie ? authCookie : null);
    // const [refreshTokenTimerId, setRefreshTokenTimerId] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [productCount, setProductCount] = useState(0);
    
    useEffect(() => {
      const refreshToken = async () => {
        if (user) {
            const user = jwt_decode(authCookie?.accessToken)
            console.log(user)
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
            if (isExpired) {
                const response = await axios.post(`${API_ENDPOINT}/api/auth/refresh-token`, {
                    refresh: authCookie?.refreshToken
                  });
                setUser(response.data.accessToken)
                setToken(response.data)
                localStorage.setItem('auth', JSON.stringify(response.data))
                console.log("Token is refreshed")
            }
          }
        }
      refreshToken()
    }, [authCookie, user])

    const Logout = () => {
        localStorage.removeItem("auth");
        setUser(null);
        setToken(null)
      };

    const Authdata = {
        user: user,
        setUser: setUser,
        token: token,
        setToken: setToken,
        Logout:Logout,
        filteredData:filteredData,
        setFilteredData : setFilteredData,
        productCount:productCount,
        setProductCount:setProductCount
    }

    return <AuthContext.Provider value={Authdata}>
            {children}
    </AuthContext.Provider>
}

