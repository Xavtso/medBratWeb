import React, { useEffect } from "react";
import "./styles/main.scss";

import { RouterProvider } from "react-router-dom";
import { router } from "./constants/router";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./store/slices/auth.slice";
import { auth } from "./firebase/firebase.config";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
