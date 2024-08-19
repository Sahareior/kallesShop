import React from 'react';
import './Checkout.css'
import { useLocation } from 'react-router-dom';
import useCon from '../../../Hooks/useCon';
const Checkout = () => {
  const location = useLocation()

 const {cartData} = useCon()
 console.log(cartData.data)
  let newdata
  const arr =[]
  if(location?.state?.text){
    arr.push(location?.state?.data)
    newdata = arr
  }
  else if(!location?.state?.text){
    newdata = location?.state?.data
  }
  else if(cartData.data){
    newdata = cartData.data
  }
 
  console.log(newdata)
    const handleSubmit=(e)=>{
        e.preventDefault()
        const total = location?.state?.total || cartData.total 
        const data = newdata || cartData.data
        const form = e.target
        const name = form.name.value 
        const email = form.email.value 
        const address = form.address.value 
        const phone = form.phone.value 
        
        const details = {name,email,address,data,total,phone}
        console.log(details)
       
        fetch('http://localhost:5000/payments',{
            method:"POST",
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(details)

        })
        .then(res=>res.json())
        .then(result => {
          window.location.replace(result.url)
          localStorage.clear('shopping-cart1')
        })
    }
    return (
      <div className='container'>
        
    <div className="mainscreen">
        <div className="card">
        <div className="rightside ">
          <form className='-mt-5' onSubmit={handleSubmit}>
         
            <h2 className='my-8'>Payment Information</h2>
            <p>Email</p>
            <input type="text" className="inputbox" name="email" required />
   
            <div className='md:flex justify-between gap-14'>
           <div>
           <p>Name</p>
            <input type="text" className="inputbox" name="name" required />
            </div>
           <div>
           <p>Address</p>
            <input type="text" className="inputbox" name="address" required />
            </div>
            
            </div>
           
            <p>Phone</p>
            <input type="number" className="inputbox" name="phone" required />
         

          
            <button type="submit" className="button">CheckOut</button>
          </form>
        </div>
      
      </div>
    </div>
  

      </div>
    );
};

export default Checkout;
