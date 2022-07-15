import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, } from "firebase/auth";
import { auth } from "./index";
import store from '../store/store'
import { setLoggedUser,clearLoggedUser } from '../store/actions/LoggedUserActions'
import {  GoogleAuthProvider, signInWithPopup } from "firebase/auth";

onAuthStateChanged(auth, (currentUser) => {
  console.log("AUTHCHANGED", currentUser ? currentUser : 'VAZIO');
  if (currentUser) {   
    const user = {
      email: currentUser.email,
      uid: currentUser.uid,
      photoURL: currentUser.photoURL
    }
    console.log("SETTANDO USUARIO LOGADO",user)
    store.dispatch(setLoggedUser(user))
  }else{
    console.log("DESLOGANDO",currentUser)
    store.dispatch(clearLoggedUser())  
  }


})


export const register = async (email, senha) => {
  return createUserWithEmailAndPassword(auth, email, senha)
};

export const login = (email, senha) => {
  return signInWithEmailAndPassword(auth, email, senha);
};

export const logout = async () => {
  await signOut(auth);
};


const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
      console.log(error);
    });
};