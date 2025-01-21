import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState(null);
    const [ userLoading, setUserLoading ] = useState(true);

    const createUser=( email, password)=>{
        setUserLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    const signIn = ( email, password ) => {
        setUserLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setUserLoading(true);
        return signOut(auth);
    }

    const googleProvider = new GoogleAuthProvider();
    const googleSignIn =()=>{
        setUserLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setUserLoading(false);
            //console.log('Current User', currentUser);
        });

        return ()=>{
            return unsubscribe();
        }
    },[]);

    const authInfo = {
        user,
        userLoading,
        createUser,
        signIn,
        logOut,
        googleSignIn,
    };

    //console.log(user);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;