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
};

const loginEmailPassword = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const createAccount = async (name, email, password) => {
  const authAccount = getAuth(app);

  await createUserWithEmailAndPassword(authAccount, email, password)
    .then(() => updateProfile(authAccount.currentUser, {
      displayName: name,
    }));
};

const signInGoogle = async () => {
  await signInWithPopup(auth, provider);
};

const logout = async () => {
  await signOut(auth);
};

export {
  auth,
  getUserName,
  loginEmailPassword,
  createAccount,
  signInGoogle,
  logout,
};
