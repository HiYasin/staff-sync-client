import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxios from "../customHooks/useAxios";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [axiosSecure] = useAxios();
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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (user) {
                axiosSecure.get(`/users?email=${user.email}`)
                    .then(res => {
                        setUserInfo(res.data);
                        //console.log(res.data);
                    });
            }
            setUserLoading(false);
        });

        return () => {
            return unsubscribe();
        }
    }, [user]);

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