import React, { useContext, useEffect, useState } from "react";
import { auth } from "../FirebaseConfig";
import { addDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  async function signup(email, password) {
    await addDoc(usersCollectionRef, {
      email: email,
      password: password,
    });
  }

  function googleLogin() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function githubLogin() {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function logOut() {
    return setCurrentUser(null);
  }

  const value = {
    users,
    setCurrentUser,
    currentUser,
    signup,
    // login,
    googleLogin,
    githubLogin,
    logOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
