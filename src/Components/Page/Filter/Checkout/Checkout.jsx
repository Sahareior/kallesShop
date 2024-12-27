import React from 'react';
import './Checkout.css';
import { redirect, useLocation } from 'react-router-dom';
import useCon from '../../../Hooks/useCon';

const Checkout = () => {
  const location = useLocation();
  const { cartData } = useCon();
  console.log(location.state)

  if (!location.state || !location.state.data || !location.state.text){
    redirect("/")
  }

  let newdata;
  const arr = [];
  if (location?.state?.text) {
    arr.push(location?.state?.data);
    newdata = arr;
  } else if (!location?.state?.text) {
    newdata = location?.state?.data;
  } else if (cartData.data) {
    newdata = cartData.data;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = location?.state?.total || cartData.total;
    const data = newdata || cartData.data;
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const address = form.address.value;
    const phone = form.phone.value;

    const details = { name, email, address, data, total, phone };

    fetch('https://kellas.vercel.app/payments', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(details),
    })
      .then((res) => res.json())
      .then((result) => {
        window.location.replace(result.url);
        localStorage.clear('shopping-cart1');
      });
  };

  return (
    <div className="containerx py-9">
      <div className="mainscreen ">
        <div className="card p-6">
          <form onSubmit={handleSubmit}>
            <h2>Payment Information</h2>

            <p>Email</p>
            <input type="email" className="inputbox" name="email" placeholder="Enter your email" required />

            <div className="md-flex">
              <div>
                <p>Name</p>
                <input type="text" className="inputbox" name="name" placeholder="Enter your name" required />
              </div>
              <div>
                <p>Address</p>
                <input type="text" className="inputbox" name="address" placeholder="Enter your address" required />
              </div>
            </div>

            <p>Phone</p>
            <input type="number" className="inputbox" name="phone" placeholder="Enter your phone number" required />

            <button type="submit" className="button">Checkout</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
