import React from 'react';
import './Signin.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useCon from '../../Hooks/useCon';

const Signin = () => {
    const location = useLocation()
    const {createUser} = useCon()
    const navigate = useNavigate()

    console.log(location)
    const handleSubmit =(e) =>{
        e.preventDefault()

        const username = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value

        console.log(username,email,password)
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
    return (
        <div>
             <div>
              <section className="min-h-screen flex items-stretch text-white ">
        <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"  style={{ backgroundImage: "url(https://img.freepik.com/premium-photo/blue-emerald-blouse-maple-leaves-fashionable-concept_134398-13973.jpg?ga=GA1.1.10786356.1696485729&semt=ais_hybrid)" }}>
            <div className="absolute bg-black opacity-30 inset-0 z-0"></div>
            <div className="w-full px-24 z-10">
                <h1 className="text-5xl font-bold text-left tracking-wide">Keep it special</h1>
                <p className="text-3xl text-zinc-50 my-4">Capture your personal memory in unique way, anywhere.</p>
            </div>

        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-[#161616]" >
            <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"  style={{ backgroundImage: "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)" }}>
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            </div>
            <div className="w-full py-6 z-20">

            
<div className='data'>
<form className="signup" onSubmit={handleSubmit} autoComplete="off">
  <h1 className='text-xl'>Create account</h1>
  <h2 className='text-sm'>Already have an account? <Link to='/login' className='ml-3'><span>Sign in</span></Link></h2>

  <div className="signup__field mt-5">
    <input className="signup__input" type="text" name="username" id="username" required />
    <label className="signup__label font-bold text-black -mt-5" htmlFor="username">Username</label>
  </div>

  <div className="signup__field">
    <input className="signup__input" type="text" name="email" id="email" required />
    <label className="signup__label font-bold text-black -mt-5" htmlFor="email">Email</label>
  </div>

  <div className="signup__field">
    <input className="signup__input" type="password" name="password" id="password" required />
    <label className="signup__label font-bold text-black -mt-5" htmlFor="password">Password</label>
  </div>

  <button>Sign up</button>
</form>
</div>
            </div>
        </div>
    </section>
        </div>
        </div>
    );
};

export default Signin;