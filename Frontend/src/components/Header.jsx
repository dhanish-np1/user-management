import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="bg-purple-800 h-16 flex items-center px-4">
  <div className=" flex justify-between w-full items-center max-w-7xl mx-auto text-white ">
    <Link to={'/'}><h1 className="font-bold text-3xl">User Mg</h1></Link>
    <ul className="flex flex-row gap-6 text-lg ml-auto">
      <Link to={'/'}><li>Home</li></Link>
      <Link to={'/about'}><li>About</li></Link>
      <Link to={'/signin'}><li>Login</li></Link>
    </ul>
  </div>
</div>

  )
}
