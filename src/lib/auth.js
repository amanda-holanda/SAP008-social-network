import { app } from './firebase.js';

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from './export.js';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log('logged in!', 'currentUser: ', auth.currentUser.uid);
  } else {
    console.log('No user');
  }
});

const getUserName = async () => await auth.currentUser.displayName;

const loginEmailPassword = async (email, password) => await signInWithEmailAndPassword(auth, email, password);

const createAccount = async (name, email, password) => {
  const auth = getAuth(app);
  return await createUserWithEmailAndPassword(auth, email, password)
    .then(() => updateProfile(auth.currentUser, {
      displayName: name,
    }));
};

const signInGoogle = async () => await signInWithPopup(auth, provider);

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
