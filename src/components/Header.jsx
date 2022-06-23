import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { setSignOut, setUserLoginCredentials } from "../redux/userSlice";
import { app } from "../firebase.config";

import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";

const Header = () => {
  const firebaseAuth = getAuth();
  const provider = new GoogleAuthProvider();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const login = async () => {
    try {
      const response = await signInWithPopup(firebaseAuth, provider);
      const {
        user: { displayName, photoURL, email },
      } = response;
      dispatch(setUserLoginCredentials({ displayName, photoURL, email }));
    } catch (e) {}
  };

  const logOut = async () => {
    try {
      await firebaseAuth.signOut();
      dispatch(setSignOut());
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <header className="w-full fixed z-50  p-6 px-16">
      {/* for desktop and tablet */}
      <div className="hidden md:flex h-full w-full justify-between">
        <Link to="/" className="flex gap-2 items-center">
          <img src={Logo} className="w-8 object-cover" alt="Logo" />
          <span className="text-headingColor text-xl font-bold">
            Food Buddy
          </span>
        </Link>
        <ul className="flex items-center gap-8 ml-auto">
          <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
            Home
          </li>
          <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
            Menu
          </li>
          <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
            About us
          </li>
          <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
            Services
          </li>
        </ul>
        <div className="flex gap-5">
          <div className="relative flex items-center justify-center">
            <MdShoppingBasket className="text-textColor text-2xl ml-8" />
            <div className="h-5 w-5 bg-red-500 text-white font-semibold text-center absolute rounded-full text-sm top-0 -right-3">
              4
            </div>
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user.isLoggedIn ? user.photoURL : Avatar}
              alt="user-profile"
              className="w-10 min-w-10 drop-shadow-xl cursor-pointer rounded-full"
              onClick={login}
            />
          </div>
        </div>
        <>
          {user.isLoggedIn && (
            <button
              className="ml-4 p-3 px-4 outline-none bg-red-500 text-white font-semibold rounded-md border-none"
              onClick={logOut}
            >
              Log Out
            </button>
          )}
        </>
      </div>
      {/* for mobile */}
      <div className="flex md:hidden h-full w-full bg-yellow-500 p-8"></div>
    </header>
  );
};

export default Header;
