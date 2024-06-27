import * as React from 'react';
import { createContext, useContext, useState, useRef, useEffect } from 'react';

export const Role = Object.freeze({
    ADMIN: 'admin',
    USER: 'user'
});

const AuthProps = {
    authState: {authenticated: Boolean | null, username: String | null, role: Role | null},
    onLogin: function (username, password) {},
    onLogout: function () {}
}

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const useIsMount = () => {
    const isMountRef = useRef(true);
    useEffect(() => {
      isMountRef.current = false;
    }, []);
    return isMountRef.current;
  };

export const AuthProvider = ({ children }) => {

    const [authState, setAuthState] = useState({
        authenticated: null,
		email: null,
		role: null
    })

    const login = async (email) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    userEmail: email,
                  }),
            })

            const json = await response.json()
            
            setAuthState({
                authenticated: true,
                email: json?.email,
                role: json?.role
            })
        }
        catch (error) {
            alert("Error" + error.message)
        }
    }

    const signup = async (id, email, role) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/sign-up', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    // *** IMPLEMENT LATER **** Generate the user ID from firebase
                    // userID: id,
                    userEmail: email,
                    userRole: role
                  }),
            })

            const json = await response.json()
            console.log(json)
        }
        catch (error) {
            alert("Error" + error.message)
        }
    }

    const logout = async () => {
        setAuthState({
            authenticated: null,
            username: null,
            role: null,
        })
    }

    const value = {
        onLogin: login,
        onSignup: signup,
        onLogOut: logout,
        authState,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
