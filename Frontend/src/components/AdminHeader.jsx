import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/user/adminSlice.js";

export default function AdminHeader() {
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    await fetch("http://localhost:3000/admin/signOut", {
      credentials: "include",
    });
    
    dispatch(signOut());
  };
  return (
    <div className="bg-gray-900 h-16 flex items-center px-4 shadow-md">
      <div className="flex justify-between w-full items-center max-w-7xl mx-auto text-white">
        <Link to="/admin/home">
          <h1 className="font-bold text-3xl text-gray-100">Admin</h1>
        </Link>
        <ul className="flex flex-row gap-6 text-lg ml-auto">
          <li className="hover:text-gray-300 transition duration-200">
            <button type="button" onClick={handleSignOut}>
              logOut
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
