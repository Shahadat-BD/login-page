import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.int';

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const auth = getAuth(app)
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const createUser =(email,password) =>{
        setLoading(true)
       return createUserWithEmailAndPassword(auth,email,password)
       
    }
    const signInUser = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
   
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const googleSignIn = () =>{
        signInWithPopup(auth,googleProvider)
    }
    const githubSignIn = () =>{
        signInWithPopup(auth,githubProvider)
    }
   
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        });
        return () =>{
            unSubscribe()
        }
    },[])

    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }

    const userInfo = {
        user,
        setUser,
        signInUser,
        createUser,
        logOut,
        loading,
        googleSignIn,
        githubSignIn
    }
    return (
        <div>
            <AuthContext.Provider value={userInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;