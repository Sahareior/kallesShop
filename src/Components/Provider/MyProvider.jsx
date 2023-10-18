import React, { createContext, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from '../Firebase/Firebase.config';
import { useEffect } from 'react';

const AuthContext = createContext();

const auth = getAuth(app);


const MyProvider = ({ children }) => {
  const [cartPrice, setCartPrice] = useState([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartData,setCartData] = useState({ total: 0, data: [] });
  const [isDarkMode, setIsDarkMode] = useState(false);

  

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {});
  };

  const profile = (displayName, photoURL) => {
    updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: photoURL,
    })
      .then(() => {
        // Profile updated!
        console.log("Profile Updated");
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      console.log("logged in user inside auth state observer", loggedUser);
      setUser(loggedUser);
      setLoading(false);
   
    });

    return () => {
      unsubscribe();
    };
  }, []);

let name = 'dsasa'
  const value = {
    setCartPrice,
    name,
    auth,
    cartPrice,
    login,
    createUser,
    user,
    profile,
    logout,
    setCartData,
    loading,
    cartData,
   isDarkMode,
   setIsDarkMode
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, MyProvider };
