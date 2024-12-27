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
    
    </div>
  );
};

export default Login;
