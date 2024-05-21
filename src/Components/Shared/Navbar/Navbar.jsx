import React, { useEffect, useState } from 'react';
import './Navbar.css'
import Dropdown from '../Dropdown/Dropdown';
import { Link } from 'react-router-dom';
import useCon from '../../Hooks/useCon';
import CartItems from '../../CartItems/CartItems'
import Mcart from '../../CartItems/mobile/Mcart';
import useIsMobile from '../../Hooks/useIsMobile';
import { ShoppingCart } from '@mui/icons-material';
import Toggler from '../toggler/Toggler';
import useData from '../../Hooks/useData';

const Navbar = () => {

  const {cartPrice} = useCon()
   const mobile = useIsMobile()
   const [data] = useData()
  
   const {user,logout,isDarkMode} = useCon()
  console.log(cartPrice)


  

  const male = data.filter(data => data.gender === 'male')
  const female = data.filter(data => data.gender === 'female')
  const hotDeals = data.filter(data => data.hotDeals === 'yes')

  return (
    <div>
<div className={`${isDarkMode? 'bg-gray-900 text-gray-100 text-sm': 'bg-[#C5AA6A]'} navbar z-30  `}>
  <div className="navbar-start">
    <div className={`dropdown ${mobile? 'visible':'hidden'}`}>
      <label tabIndex={0} className="btn btn-ghost hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

     <li>
    
     <Link to='/products' state={{data:male, type:"male"}}> <h3 className=' text-2xl hover:text-red-600 font-bold'><u>Men</u></h3></Link>
   <Link to='/products' state={{data:female, type:"female"}}> <h3 className=' text-2xl hover:text-red-600 font-bold'><u>Women</u></h3></Link>
   <Link to='/products' state={{ product:'watch'}}> <h3 className=' text-2xl hover:text-red-600 font-bold'><u>Watch</u></h3></Link>
   <Link to='/products' state={{ product:'sunglass'}}> <h3 className=' text-2xl hover:text-red-600 font-bold'><u>Glasess</u></h3></Link>

     </li>
      
      </ul>
    </div>
    <Link to='/' className="btn btn-ghost normal-case "><img className={`${isDarkMode? 'bg-slate-50': ''} mr-24  md:mr-0`} src="https://demo-kalles-4-1.myshopify.com/cdn/shop/files/kalles_babcb241-47cc-4352-a0ae-1458bbff9dcc.png?v=1652178358&width=95" alt="" /></Link >
    
<li className={mobile? "hidden": ''}>
<ul className="navbar-links ">
<li className="navbar-dropdown">
 <li> <h6 className='mt-4  '>Shop</h6></li>
  <div className="dropdown">
<div>
  
<div>

<div  className=' flex justify-around my-14'>
    
  
   <Link to='/products' state={{data:male, type:"male"}}> <h3 className='text-white text-2xl hover:text-red-600 font-bold'><u>Men</u></h3></Link>
   <Link to='/products' state={{data:female, type:"female"}}> <h3 className='text-white text-2xl hover:text-red-600 font-bold'><u>Women</u></h3></Link>
   <Link to='/products' state={{ product:'watch'}}> <h3 className='text-white text-2xl hover:text-red-600 font-bold'><u>Watch</u></h3></Link>
   <Link to='/products' state={{ product:'sunglass'}}> <h3 className='text-white text-2xl hover:text-red-600 font-bold'><u>Glasess</u></h3></Link>

  </div>
</div>
  <div className='mt-5 '>
  
  <div className='p-8 bg-black'>
  <h3 className=' text-red-600 text-3xl flex justify-center mr-44'>Hot Deals!</h3>
  <Dropdown hotDeals={hotDeals}></Dropdown>
  </div>
  </div>
</div>
  </div>
</li>

</ul>
</li>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link to='/admin'><span className={`${isDarkMode? 'text-white':''} text-sm`}> DashBoard</span></Link></li>
 

    </ul>
  </div>
  <div className="navbar-end z-10">
   <li className='mr-7'> <Toggler></Toggler></li>
  <div className="flex justify-center items-center">
    <div className="dropdown  dropdown-end">
     <li className='md:flex mr-5 md:visible relative '>
 {mobile?<Link to='/mcart' ></Link>:<CartItems ></CartItems>}
 <span className="badge badge-sm absolute -left-4 -top-2  indicator-item">{cartPrice.length || 0}</span>
     </li>
      <li className='md:hidden'><Link to='/mcart' >  <ShoppingCart /></Link></li>
    </div>
  
    <div className="dropdown dropdown-end">
    {
  user ? (
    <div>
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="User Avatar" />
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><button onClick={logout}>Logout</button></li>
      </ul>
    </div>
  ) :  <Link to='/login'>
  <li><button className={`${isDarkMode? 'text-white':''} btn btn-ghost`}>Sign In</button></li>
</Link>
}

    </div>
  </div>
  </div>
</div>
    </div>
  );
};

export default Navbar;


