import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import profile from '../assets/profile.png'

export default function Header() {
  const {currentUser}=useSelector(state=>state.user)
  return (
    <div className="bg-gray-900 h-16 flex items-center px-4 shadow-md">
    <div className="flex justify-between w-full items-center max-w-7xl mx-auto text-white">
      <Link to="/">
        <h1 className="font-bold text-3xl text-gray-100">User Mg</h1>
      </Link>
      <ul className="flex flex-row gap-6 text-lg ml-auto">
        <li className="hover:text-gray-300 transition duration-200">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-gray-300 transition duration-200">
          {currentUser ? (
              <Link to="/profile">
            <div className="flex flex-col items-center">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={profile}
                alt="Profile"
              />
            </div>
            </Link>
          ) : (
            <Link to="/signin">Login</Link>
          )}
        </li>
      </ul>
    </div>
  </div>
  
  );
}
