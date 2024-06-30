import * as React from 'react';
import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { auth } from '../FireBaseConfig'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export const Role = Object.freeze({
    ADMIN: 'admin',
    USER: 'user'
});

// const AuthProps = {
//     authState: {authenticated: Boolean | null, username: String | null, role: Role | null},
//     onLogin: function (username, password) {},
//     onLogout: function () {}
// }

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


    const login = async (email, password, role) => {
        try {
            const firebase_response = await signInWithEmailAndPassword(auth, email, password);
            const api_response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    userEmail: email,
                  }),
            })

            const json = await api_response.json()
            if (json?.role === role) {
                setAuthState({
                    authenticated: true,
                    email: json?.email,
                    role: json?.role,
                    id: json?.id,
                })
            }
        }
        catch (error) {
            alert("Error" + error.message)
        }
    }

    const signup = async (email, password, role) => {
        try {
            const firebase_response = await createUserWithEmailAndPassword (auth, email, password);
            const api_response = await fetch('http://127.0.0.1:5000/sign-up', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    userEmail: email,
                    userRole: role,
                    userID: firebase_response?.user.uid,
                  }),
            })

            const json = await api_response.json()
            if (json?.role === role) {
                setAuthState({
                    authenticated: true,
                    email: json?.email,
                    role: json?.role,
                    id: json?.id,
                })
            }
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
        setAuthState,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
