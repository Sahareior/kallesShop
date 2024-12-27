import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { addToDb, decrease, deleteShoppingCart, getShoppingCart } from '../../Hooks/useTools';
import useCon from '../../Hooks/useCon';
import { DeleteOutlineRounded } from '@mui/icons-material';
import { useGetProductsQuery } from '../../../ReactRedux/apiSlice';

const Mcart = () => {
  const [cart, setCart] = useState([]); // Add state to manage quantity.
  const [id,setId] = useState(null)
  const { data: products } = useGetProductsQuery();
  const aws = getShoppingCart();
const {setCartData,cartPrice, setCartPrice, isDarkMode} = useCon()


const trigger =Object.keys(aws).length;
console.log("rrr",trigger)

useEffect(() => {
  const checkoutData = Object.keys(aws).map((id) => ({
    id,
    quantity: aws[id],
  }));
  setCart(checkoutData);
}, [trigger]);

const storedItems = cart
  .map((item) => {
    const product = products?.find((p) => p._id === item.id);
    return product ? { ...product, quantity: item.quantity } : null;
  })
  .filter(Boolean);

const subtotal = storedItems.reduce((total, item) => total + item.price * item.quantity, 0);

const increaseValue = (product) => {
  addToDb(product._id);
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === product._id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

const decreaseValue = (product) => {
  decrease(product._id);
  setCart((prevCart) =>
    prevCart
      .map((item) =>
        item.id === product._id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      )
      .filter((item) => item.quantity > 0)
  );
};


const filterData = (id) => {
  deleteShoppingCart(id);
  setCart((prevCart) => prevCart.filter((item) => item.id !== id));
};

useEffect(() => {
  const cartdata = { total: subtotal, data: cart };
  setCartData(cartdata);
}, [subtotal, cart]);

  return (
    <div className={`${isDarkMode ? 'bg-black text-white' : ''}`}>
      <h3 className='text-center mt-9'>Added Items</h3>
      <div className="flex flex-col justify-center items-center" data-mcs-theme="dark">
        {storedItems.map((info) => (
          <div key={info._id} className="my-6 border-b-2 border-fuchsia-300 pb-8 relative">
            <div className="product-container flex-col flex items-center">
              <img className="w-72" src={info.img} alt="" />
              <div className="product-info mt-5 flex gap-4 flex-col">
                <h3 className='text-xl text-red-500'>{info.title}</h3>
                <span className="text-xl font-bold text-fuchsia-500">{info.price} $</span>
                <div className="flex gap-6">
                  <h3>Quantity:</h3>
                  <div className={`${isDarkMode ? 'text-black' : ''} quantity-field text-xl`}>
                    <button
                      className="value-button decrease-button"
                      onClick={() => decreaseValue(info)}
                      title="Decrease"
                    >
                      -
                    </button>
                    <div className="number font-bold text-3xl">{aws[info._id]}</div>
                    <button
                      className="value-button increase-button"
                      onClick={() => increaseValue(info)}
                      title="Increase"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                className="absolute btn hover:btn-error bg-red-600"
                onClick={() => filterData(info._id)}
                style={{
                  position: "absolute",
                  top: "4.5%",
                  left: "89%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <DeleteOutlineRounded />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-2 p-7'>
        <h3 className='flex justify-around font-bold '>Subtotal:<span>{subtotal} $</span></h3>
        <div className='flex flex-col mt-8 justify-center items-center gap-2'>
          <Link to='/checkout' state={{ total: subtotal, data: cart }}> <button className='btn btn-secondary'>Check Out</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Mcart;
