import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // cleanup function to avoid memory leaks
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  // create user (Register)
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;
      if (error.message.includes("Password")) {
        systemErrorMessage = "Password must be at least 6 characters long!";
      } else if (error.message.includes("email-already-in-use")) {
        systemErrorMessage = "Email already in use!";
      } else {
        systemErrorMessage = "An error occurred, please try again later!";
      }

      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  // Logout - sign out

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  // Login - sign in
  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);

    try {
      //console.log(data);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "User not found!";
      }
      if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Wrong password!";
      } else {
        systemErrorMessage = "An error occurred, please try again later!";
      }

      //console.log("LOGIN ERROR:", error.code);
      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
