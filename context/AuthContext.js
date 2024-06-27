import * as React from 'react';
import { createContext, useContext, useState } from 'react';

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

export const AuthProvider = ({ children }) => {

	// const [authState, setAuthState] = useState<{
	// 	authenticated: Boolean | null,
	// 	username: String | null,
	// 	role: Role | null,
	// }>({
	// 	authenticated: null,
	// 	username: null,
	// 	role: null
	// });

    const [authState, setAuthState] = useState({
        authenticated: null,
		username: null,
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
            console.log(json)
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

    // const login = (username, password) => {
    //     if (username === 'admin' && password === 'admin') {
    //         setAuthState({
    //             authenticated: true,
    //             username: username,
    //             role: Role.ADMIN,
    //         })
    //     }
    //     else if (uername === 'user' && password == 'user') {
    //         setAuthState({
    //             authenticated: true,
    //             username: username,
    //             role: Role.USER,
    //         })
    //     }
    //     else {
    //         alert('Invalid username or password')
    //     }
    // }

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
