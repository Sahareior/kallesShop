
import { Link, Outlet, useLocation } from 'react-router-dom';

const Admin = () => {
const loacation = useLocation()
console.log(loacation.pathname)
const toggggle = location.pathname === '/admin'
    return (
        <div>
            <div className="drawer text-2xl">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
  <div className="drawer-content  flex flex-col">
    {/* Navbar */}
    <div className="w-full  navbar bg-base-300">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div> 
      <div className="flex-1 px-2 mx-2"><Link to='/'><h3 className='text-fuchsia-400'>Homepage</h3></Link></div>
      <div className="flex-none hidden lg:block">
        <ul className="menu text-xl menu-horizontal">
          {/* Navbar menu content here */}
          <li className='text-xl'><Link to='/admin/add'> <h4>Add Items</h4> </Link></li>
          <li className='text-xl'><Link to='/admin/products'><h4>All products</h4></Link></li>
          <li className='text-xl'><Link to='/admin/orders'><h4>Order List</h4></Link></li>
        </ul>
      </div>
    </div>
    <div>
     {
      toggggle && <div className='mt-11'>
         <h1 className='flex justify-center items-center my-auto '>Hii there!</h1>
         <p className='text-xl text-center mt-5'>This is lowcost admin panel!... xd. So dont expect much</p>
      </div>
     }
    </div>
    <Outlet></Outlet>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 h-full bg-base-200">
      {/* Sidebar content here */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
      
    </ul>
    
  </div>
</div>
        </div>
    );
};

export default Admin;