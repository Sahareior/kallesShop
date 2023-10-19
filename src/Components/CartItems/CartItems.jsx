import React, { useEffect, useState } from 'react';
import './Styles.css'
import { Drawer, ButtonToolbar, Button, IconButton } from 'rsuite';
import {  DeleteOutlineRounded, ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { addToDb, decrease, getShoppingCart,deleteShoppingCart } from '../Hooks/useTools';
import useCon from '../Hooks/useCon';

const CartItems = () => {
  
  const [size, setSize] = React.useState('sm');
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
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
        // console.log("Invalid price or quantity value");
        continue; // Skip this iteration if there's an issue with price or quantity
      }
      
      subtotal += item.price * quantity;
    }

  }

//     for (const item of cart) {
//       // subtotal += item.price * item.quantity;
//        quantity = aws[item.id]
//       console.log(quantity)
//     }

//     const value ={
//       quantity,subtotal
//     }
// console.log(value)

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
    // const targetProduct = aws[product.id] 
    // console.log(targetProduct)
    addToDb(product.id)
  };


  const decreaseValue = (product) => {
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

  // const totalPrice =()=>{
  //   const isExists = 
  // }


useEffect(()=>{
  const cartdata = { total: subtotal, data: checkoutData };
    setCartData(cartdata)
},[])


const filterData = (id) =>{
  setCartPrice((prevCartPrice) => prevCartPrice.filter(item => item.id !== id))
  deleteShoppingCart(id)
}

console.log(subtotal)
  return (
    <>
      <hr />
      <ButtonToolbar>
        <IconButton
          icon={
           <ShoppingCart />
          }
          onClick={() => handleOpen('right')}
        >
      
        </IconButton>
      </ButtonToolbar>

      <Drawer size={size} placement={placement} open={open} onClose={() => setOpen(false)} className='w-100px] mr-[900px] h-20 md:mr-0'>
        <Drawer.Header>
         
        </Drawer.Header>
        <Drawer.Body className={`${isDarkMode? 'bg-black text-white': ''} w-[350px]  md:w-full p-0 h-20`}>
          <h3 className='text-center'>Added Items</h3>
        
          <div className="longEnough mCustomScrollbar h-[690px] overflow-y-scroll  ml-14" data-mcs-theme="dark">
          {
  cartPrice.map(info =>      <div key={info.id} className='my-14 relative'>
  <img className='w-80' src={info.img} alt="" />
  <div className='flex gap-2 flex-col'>
      <h3>{info.title}</h3>
      <span className='text-xl font-bold text-fuchsia-500'>{info.price} $</span>
      <div className="flex">
        <h3> Quantity:</h3>
        <div className="quantity-field text-xl" >
                    <button
                    className="value-button decrease-button"
                    onClick={() => decreaseValue(info)}
                    title="Azalt"
                >-</button>
 <div className="number font-bold text-3xl">{aws[info.id]}</div>
  <button 
    className="value-button increase-button" 
    onClick={()=> increaseValue(info)}
    title="Arrtır"
  >+
  </button>
</div>
    </div>
    <button className='absolute btn hover:btn-errorb bg-red-600 top-0 right-14' onClick={()=>filterData(info.id)}> <DeleteOutlineRounded /></button>
  </div>
</div>)
 }
</div>

        <div className='mt-2 p-7'>
        <h3 className='flex justify-around font-bold '>Subtotal:<span>{subtotal} $</span></h3>
          <div className='flex flex-col mt-8 justify-center items-center gap-2'>
           {/* <Link to='/allCartItems'> <button className='btn btn-primary'>View Cart</button></Link> */}
           <Link to='/checkout' state={{total:subtotal, data:checkoutData}}> <button className={`${subtotal? 'btn btn-secondary': 'hidden'}`}>Check Out</button></Link>
          </div>
        </div>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default CartItems;

