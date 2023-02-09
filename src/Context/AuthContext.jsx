import React, { useContext, useEffect, useState } from "react";
import { auth } from "../FirebaseConfig";
import { addDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import {
  // createUserWithEmailAndPassword,
  // signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  // signOut,
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

  function login(email, password) {
    // return signInWithEmailAndPassword(auth, email, password);
    for (const user of users) {
      if (user.email === email && user.password === password) {
        setCurrentUser(user.email);
      } else {
        return false;
      }
    }
    // const userEmails = users.map((user) => user.email);
    // if (userEmails.includes(email)) {
    //   console.log(userEmails);
    // } else {
    //   console.log("Email not already");
    // }
    // authenticate(email, password)
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

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setCurrentUser(user);
  //   });

  //   return unsubscribe;
  // }, []);

  const value = {
    users,
    setCurrentUser,
    currentUser,
    signup,
    login,
    googleLogin,
    githubLogin,
    logOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
