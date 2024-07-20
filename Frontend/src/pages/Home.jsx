import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-400 to-indigo-600">
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
            Welcome to <span className="text-purple-200">YourApp</span>
          </h1>
          <p className="mt-3 text-xl text-purple-100 sm:mt-5 sm:text-2xl">
            Discover amazing features and boost your productivity with our innovative platform.
          </p>
          <div className="mt-8 sm:mt-10">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50 sm:text-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
