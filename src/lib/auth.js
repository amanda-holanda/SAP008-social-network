import { app } from './firebase.js';

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from './export.js';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const getUserName = async () => {  
  await auth.currentUser.displayName;
  try {
    return await auth.currentUser.displayName;
  } catch (error) {
    return error;
  }  
};

const loginEmailPassword = async (email, password) => {  
  await signInWithEmailAndPassword(auth, email, password);
  try {    
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error;
  }
};

const createAccount = async (name, email, password) => {
  const authAccount = getAuth(app);
  await createUserWithEmailAndPassword(authAccount, email, password);
  try {
    return updateProfile(authAccount.currentUser, {
      displayName: name,
    });

  } catch (error) {
    return error;
  }    
};

const signInGoogle = async () => {  
  await signInWithPopup(auth, provider);
  try {
    return await signInWithPopup(auth, provider);
  } catch (error) {
    return error;
  }
};

const logout = async () => { 
  await signOut(auth);
  try {
    return await signOut(auth);
  } catch (error) {
    return error;
  }
};

export {
  auth,
  getUserName,
  loginEmailPassword,
  createAccount,
  signInGoogle,
  logout,
};
