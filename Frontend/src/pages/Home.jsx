import React, { useState, useEffect } from 'react';

const Home = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">Welcome to MyApp</h1>
        <p className="text-2xl text-gray-600 mb-8">Your journey to excellence begins here.</p>
        <div className="text-5xl font-mono text-gray-900">
          {time.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default Home;
