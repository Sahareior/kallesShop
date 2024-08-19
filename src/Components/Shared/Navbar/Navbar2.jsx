import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import useData from '../../Hooks/useData';

const Navbar2 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [data] = useData();

  return (
    <div className='flex justify-between items-center px-4 py-2 bg-white shadow-md'>
      <div className='flex gap-7 items-center'>
        <h1 className="text-xl text-gray-800 font-bold">HotCoffee</h1>
        <div
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className="font-semibold text-gray-700">
            Shop
          </div>
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-96 bg-white border border-gray-300 rounded-md shadow-lg">
              {data.map(item => (
                <div key={item._id} className="card bg-base-100 shadow-xl m-2">
                  <figure>
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Shoes!
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline">Fashion</div>
                      <div className="badge badge-outline">Products</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <nav className="flex items-center space-x-6">
        <div className="flex items-center border border-gray-300 rounded-md p-1">
          <SearchIcon className="text-gray-600" />
          <input
            className="ml-2 outline-none bg-transparent"
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
          />
        </div>
        <ul className="flex items-center space-x-6">
          <li className="font-semibold text-gray-700">Home</li>
          <li className="font-semibold text-gray-700">Articles</li>
          <li>
            <ShoppingCartIcon className="text-gray-700" />
          </li>
          <li>
            <PersonIcon className="text-gray-700" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar2;
