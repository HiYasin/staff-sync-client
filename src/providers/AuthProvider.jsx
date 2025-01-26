import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [userLoading, setUserLoading] = useState(true);

    const createUser = (email, password) => {
        setUserLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setUserLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setUserLoading(true);
        return signOut(auth);
    }

    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = () => {
        setUserLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    //const currentToken = localStorage.getItem('access-token');
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                // get token and store
                const userData = {email: currentUser.email};
                axios.post('http://localhost:3000/jwt', userData)
                 .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                    }
                })
                .catch(err => {
                    console.error(err);
                });

                axios.get(`http://localhost:3000/users?email=${user?.email}`)
                    .then(res => {
                        setUserInfo(res.data);
                    });
                
            }else{
                //remove token from client side
                //logOut();
                localStorage.removeItem('access-token');
            }
            setUserLoading(false);
        });

        return () => {
            return unsubscribe();
        }
    }, [user]);

    //console.log(userInfo);
    const authInfo = {
        user,
        userInfo,
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