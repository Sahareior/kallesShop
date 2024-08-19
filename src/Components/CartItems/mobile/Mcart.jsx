import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { addToDb, decrease, deleteShoppingCart, getShoppingCart } from '../../Hooks/useTools';
import useCon from '../../Hooks/useCon';
import { DeleteOutlineRounded } from '@mui/icons-material';

const Mcart = () => {
  const [cart, setCart] = useState([]); // Add state to manage quantity.
  const [id,setId] = useState(null)
const {setCartData,cartPrice, setCartPrice, isDarkMode} = useCon()


// const newData = cartPrice.filter(items=> items.id !== id)
// console.log(newData)

  const aws = getShoppingCart()
  console.log(aws)
let checkoutData = []


  for(const items in aws){
    let value={
       id:items,
       quantity: aws[items]
     }
  checkoutData.push(value)

   }


  let subtotal = 0;

  for (const item of cartPrice) {
    if (aws.hasOwnProperty(item.id)) {
      let quantity = aws[item.id];
      // console.log(`Processing item: ${item.id}, Quantity: ${quantity}`);
      
      // Check item.price and quantity values
      if (typeof item.price !== 'number' || typeof quantity !== 'number') {
        
        continue; 
      }
      
      subtotal += item.price * quantity;
    }

  }



  const increaseValue = (product) => {
    let newCart = [];
    // const newCart = [...cart, product];
    // if product doesn't exist in the cart, then set quantity = 1
    // if exist update quantity by 1
    const exists = cart.find(pd => pd.id === product.id);
 
    if(!exists){
        product.quantity = 1;
        newCart= [...cart, product]
    }
  
    else{
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter(pd => pd.id !== product.id);
      newCart = [...remaining, exists];
  }
    setCart(newCart);

    addToDb(product.id)
  };


  const decreaseValue = (product) => {
    let newCart = [];

    const exists = cart.find(pd => pd.id === product.id);

    if(!exists){
        product.quantity = 1;
        newCart= [...cart, product]
    }
  
    else{
      exists.quantity = exists.quantity - 1;
      const remaining = cart.filter(pd => pd.id !== product.id);
      newCart = [...remaining, exists];
  }
    setCart(newCart);
 
    decrease(product.id)
  };

  const handleOpen = key => {
    setOpen(true);
    setPlacement(key);
  };


useEffect(()=>{
  const cartdata = { total: subtotal, data: checkoutData };
    setCartData(cartdata)
},[])


const filterData = (id) =>{
  setCartPrice((prevCartPrice) => prevCartPrice.filter(item => item.id !== id))
  deleteShoppingCart(id)
}



  return (
    <div className={`${isDarkMode ? 'bg-black text-white' : ''}`}>
      <h3 className='text-center mt-9'>Added Items</h3>
      <div className="flex flex-col justify-center items-center" data-mcs-theme="dark">
        {cartPrice.map((info) => (
          <div key={info.id} className="my-6 border-b-2 border-fuchsia-300 pb-8 relative">
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
                    <div className="number font-bold text-3xl">{aws[info.id]}</div>
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
                onClick={() => filterData(info.id)}
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
          <Link to='/checkout' state={{ total: subtotal, data: checkoutData }}> <button className='btn btn-secondary'>Check Out</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Mcart;
