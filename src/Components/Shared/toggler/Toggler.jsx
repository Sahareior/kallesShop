import React, { useState, useEffect } from 'react';
import useCon from '../../Hooks/useCon';

const Toggler = () => {
 const {isDarkMode,setIsDarkMode} = useCon()

    useEffect(() => {
      // Check if dark mode is stored in local storage
      const storedDarkMode = localStorage.getItem('isDarkmode');
      
    }, []);
  
    const toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
      localStorage.setItem('isDarkmode', !isDarkMode);
    };
// w-10 h-5 // w-7 h-7

  return (
    <button
    className={`md:w-14 md:h-7 w-8 h-4 rounded-full ${isDarkMode ? 'bg-white' : ''} flex items-center transition duration-300 focus:outline-none shadow`}
    onClick={toggleTheme}
  >
    <div
      id="switch-toggle"
      className={`md:w-10 md:h-10 w-8 h-7 relative rounded-full transition duration-500 transform ${
        isDarkMode ? 'bg-gray-700 translate-x-7' : 'bg-yellow-500 -translate-x-4'
      } p-1 text-white`}
    >
      {isDarkMode ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
            <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
        <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
        </svg>
      )}
    </div>
  </button>
  );
};

export default Toggler;
