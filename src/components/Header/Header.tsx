import React from "react";
import "./Header.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { setUser } from "../../store/slices/auth.slice";

const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const getInitials = (nameOrEmail: string) => {
    if (!nameOrEmail) return "?";
    return nameOrEmail.charAt(0).toUpperCase();
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(setUser(null));
  };

  return (
    <header className="header">
      <h1 className="logo">Med Brat</h1>
      {user && (
        <div className="user-block" onClick={handleLogout}>
          <div className="avatar">
            {user.photoURL ? (
              <img src={user.photoURL} alt="avatar" />
            ) : (
              <span>{getInitials(user.displayName || user.email || "")}</span>
            )}
          </div>
          <span className="logout-text">Log out</span>
        </div>
      )}
    </header>
  );
};

export default Header;
