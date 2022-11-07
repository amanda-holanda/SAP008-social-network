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

const getUserName = () => auth.currentUser.displayName;

const loginEmailPassword = (email, password) => signInWithEmailAndPassword(auth, email, password);

const createAccount = async (name, email, password) => {
  const authAccount = getAuth(app);
  await createUserWithEmailAndPassword(authAccount, email, password);

  return updateProfile(authAccount.currentUser, {
    displayName: name,
  });
};

const signInGoogle = () => signInWithPopup(auth, provider);

const logout = () => signOut(auth);

export {
  auth,
  getUserName,
  loginEmailPassword,
  createAccount,
  signInGoogle,
  logout,
};
