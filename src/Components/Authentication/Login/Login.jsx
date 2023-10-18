import React, { useState } from 'react';
import './Login.css';
import useCon from '../../Hooks/useCon';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const {createUser,login} = useCon()
  const navigate = useNavigate()
  const location = useLocation()

  const path = location.state?.state?.pathname || '/';

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleCreateUser =(e)=>{
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    console.log(name,email,password)
    createUser(email,password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
      });

  }

const handleLogin =(e)=>{
  e.preventDefault()
  const email = e.target.email.value 
  const password = e.target.pass.value 
  login(email,password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    navigate(path)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}
  return (
    <div>
      <div className={`form-structor ${isLoginForm ? 'slide-up' : ''}`}>
        <form onSubmit={handleCreateUser} className="signup">
          <h2 className="form-title" onClick={toggleForm}>
            <span></span>Signup
          </h2>
          <h3 className='ml-3'>Signup</h3>
          <div className="form-holder">
            <input type="text" name='name'  className="input" placeholder="Name" />
            <input type="email" name='email' className="input" placeholder="Email" />
            <input type="password" name='password' className="input" placeholder="Password" />
          </div>
          <button className="submit-btn">Sign up</button>
        </form>
        <div className={`login ${isLoginForm ? 'slide-up' : ''}`}>
          <form onSubmit={handleLogin} className="center">
            <h2 className="form-title" onClick={toggleForm}>
              <span></span>{isLoginForm?'Login?':'SignUp?'}
            </h2>
            <div className="form-holder">
              <input type="email" name='email' className="input" placeholder="Email" />
              <input type="password" name='pass' className="input" placeholder="Password" />
            </div>
            <button className="submit-btn">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
