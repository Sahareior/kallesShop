import React, { useEffect, useState } from 'react';
import './Styles.css';
import { Drawer, ButtonToolbar, IconButton } from 'rsuite';
import { DeleteOutlineRounded, ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { addToDb, decrease, getShoppingCart, deleteShoppingCart } from '../Hooks/useTools';
import useCon from '../Hooks/useCon';
import useIsMobile from '../Hooks/useIsMobile';
import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../../ReactRedux/apiSlice';

const CartItems = () => {
  const mobile = useIsMobile();
  const taskData = useSelector((state) => state.taskStore.cart);
  const { data: products } = useGetProductsQuery();

  const aws = getShoppingCart();
  const [size, setSize] = useState('sm');
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [cart, setCart] = useState([]);
  const { setCartData, isDarkMode } = useCon();

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

  const handleOpen = (key) => {
    setOpen(true);
    setPlacement(key);
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
    <>
      <hr />
      <ButtonToolbar>
        <IconButton
          icon={<ShoppingCart />}
          onClick={() => handleOpen('right')}
        ></IconButton>
      </ButtonToolbar>

      <Drawer
        size={size}
        placement={placement}
        open={open}
        onClose={() => setOpen(false)}
        className="w-100px mr-[900px] h-20 md:mr-0"
      >
        <Drawer.Header></Drawer.Header>
        <Drawer.Body
          className={`${isDarkMode ? 'bg-black text-white' : ''} w-[300px] md:w-full p-0 h-20`}
        >
          <h3 className="text-center">Added Items</h3>

          <div className="longEnough mCustomScrollbar h-[690px] overflow-y-scroll ml-14" data-mcs-theme="dark">
            {storedItems.length === 0 && (
              <p className="flex justify-center items-center text-xl mt-24">No items</p>
            )}
            {storedItems.map((info) => (
              <div key={info._id} className="my-14 relative">
                <img className="w-80" src={info.img} alt="" />
                <div className="flex gap-2 flex-col">
                  <h3 className="text-xl text-black font-semibold mt-3">{info.title}</h3>
                  <span className="text-xl font-bold text-fuchsia-500">{info.price} $</span>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xl"> Quantity:</h3>
                    <div className="quantity-field text-xl">
                      <button
                        className="value-button decrease-button"
                        onClick={() => decreaseValue(info)}
                        title="Decrease"
                      >
                        -
                      </button>
                      <div className="number font-bold text-3xl">{info.quantity}</div>
                      <button
                        className="value-button increase-button"
                        onClick={() => increaseValue(info)}
                        title="Increase"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="absolute btn hover:btn-error bg-red-600 top-0 right-16"
                    onClick={() => filterData(info._id)}
                  >
                    <DeleteOutlineRounded />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 p-7">
            <h3 className="flex justify-around font-bold ">
              Subtotal:<span>{subtotal} $</span>
            </h3>
            <div className="flex flex-col mt-8 justify-center items-center gap-2">
              <Link
                to="/checkout"
                state={{ total: subtotal, data: cart }}
              >
                <button className={`${subtotal ? 'btn btn-secondary' : 'hidden'}`}>
                  Check Out
                </button>
              </Link>
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default CartItems;
