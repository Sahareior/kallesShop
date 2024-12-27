import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useCon from '../../Hooks/useCon';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Google } from '@mui/icons-material';

const PcLogin = () => {
  const provider = new GoogleAuthProvider();
  const { auth, login } = useCon();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.state?.state?.pathname || '/';

  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        navigate(path);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate(path);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <section className="w-full flex md:p-12 justify-center  bg-slate-700 text-white">
      {/* Left Image Section */}
      <div
        className="lg:flex w-3/5 hidden bg-cover bg-center relative"
        style={{ backgroundImage: "url('https://img.freepik.com/free-photo/top-view-chef-attire_23-2151217195.jpg?t=st=1728452509~exp=1728456109~hmac=20ba3a10c375f0a804818b83d140e03f1253e140394fcd44f5e55d022797c081&w=740')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="z-10 p-24">
          <h1 className="text-5xl font-bold mb-4">Welcome Back</h1>
          <p className="text-xl">Log in to access your personalized dashboard.</p>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="lg:w-[499px] w-full flex items-center justify-center ">
        <div className="w-full max-w-md px-8 py-12 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-left font-medium mb-2">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full p-3 rounded-lg bg-gray-700 focus:bg-gray-600 border border-gray-600 text-white"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-left font-medium mb-2">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full p-3 rounded-lg bg-gray-700 focus:bg-gray-600 border border-gray-600 text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition duration-300"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p>Or log in with:</p>
            <button
              onClick={handleGoogle}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg mt-4 transition duration-300"
            >
              <Google />
            </button>
          </div>

          <div className="mt-6 text-center">
            <p>
              Don't have an account?{' '}
              <Link to="/reg" className="text-blue-400 hover:text-blue-300">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PcLogin;
