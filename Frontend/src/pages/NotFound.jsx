import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-6xl font-extrabold text-gray-800">404</h1>
        <p className="text-2xl text-gray-600 mt-4">Oops! Page Not Found</p>
        <p className="text-lg text-gray-500 mt-2">
          The page you're looking for doesn't exist.
        </p>
        <button
          onClick={handleGoBack}
          className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
