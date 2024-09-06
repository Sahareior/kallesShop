import React, { useEffect, useMemo, useState } from 'react';
import Headings from '../Shared/Headings';
import useData from '../Hooks/useData';
import { AddReactionOutlined, CalendarMonth, EmailOutlined, LocationCityOutlined, MoneyOffTwoTone, Person2Outlined, PhoneAndroidOutlined } from '@mui/icons-material';

const Orders = () => {
  const [item, setItem] = useState([]);
  const [data] = useData();
  const [date,setDate] = useState(" ")
  const [initialNewDate, setInitialNewDate] = useState([]);
  const [newDate, setNewDate] = useState([]);

const handeleDate = (e) =>{
  setDate(e.target.value)
}

  useEffect(() => {
    const url = `https://kallesshopserver-production.up.railway.app/orders?date=${date}`
    console.log(url)
      fetch(url)
        .then((res) => res.json())
        .then((result) => setItem(result));
  }, [date]);
console.log(item)
  const idArray = item.flatMap(items => {
      if (items && items.orderdItem && items.orderdItem.data) {
        return items.orderdItem.data.flatMap(dataItem => dataItem.id);
      } else {
        return []; // Return an empty array if the data is not available
      }
    });
    


  const matchedData = [];
  const idSet = new Set(); // Set to keep track of unique IDs
  
  for (const id of idArray) {
      // Check if the id is not already in the Set
      if (!idSet.has(id)) {
          const exists = data.find(info => info.id == id);
          if (exists) {
              matchedData.push(exists);
              idSet.add(id); // Add the id to the Set
          }
      }
  }
  
  useEffect(() => {
    const dates = new Set();

    item.forEach(order => {
      if (order.orderDate !== undefined) {
        dates.add(order.orderDate);
      }
    });

    const newDatesArray = Array.from(dates);

    // Check if the initialNewDate state is empty, then set the initial value
    if (initialNewDate.length === 0) {
      setInitialNewDate(newDatesArray);
    }

    setNewDate(initialNewDate); // Set newDate to initialNewDate
  }, [item, initialNewDate]);

  console.log(newDate);
    return (
      <div >
  {/* {
                newDate.map(data => <option key={data} value={date}>{data}</option> )
               } */}
      <h2 className='text-center mt-14'><u>Order Details</u></h2>
      <div className='ml-12'>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="brandName"
              >
                Filter By Date
              </label>
              <div className="relative  h-28">
                <select
                  name="selectedBrand"
                  onChange={handeleDate}
                  id="selectedBrand"
                  className="block w-80 px-9 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  {/* <option value="" disabled selected>Select a brand</option> */}
                  <option value="">All Orders</option>
                  {
                    newDate.map(items => <option key={items} value={items}>{items}</option>)
                  }
                  {/* Add more options here */}
                </select>
             
              </div>
            </div>
   <div >
 
   <div className='flex justify-center flex-col  p-14 gap-4 '>
      {/* ........... */}
    {item.length > 0 &&  // Add conditional rendering
          item.map(order => (
              <div className='border flex items-center justify-around border-black' key={order._id}>
               <div className='flex flex-col gap-2'>
                <h4><CalendarMonth /> Date: {order.orderDate}</h4>
               <h4> <Person2Outlined /> Name: {order.orderdItem.name}</h4>
                  <h4> <EmailOutlined /> Email: {order.orderdItem.email}</h4>
                  <h4><LocationCityOutlined /> Address: {order.orderdItem.address}</h4>
                  <h4><PhoneAndroidOutlined /> Phone: {order.orderdItem.phone}</h4>
                  <h4 className='text-red-500'><MoneyOffTwoTone /> Total: {order.orderdItem.total} $</h4>
                  <h4 className='border border-red-600 flex justify-center items-center bg-red-400 text-white w-28'>Paid: {order.paid? "Yes":"No"}</h4>
                  
               </div>
                  <div className='flex mt-7 gap-28 w-[1050px] overflow-x-auto'>
                  {order.orderdItem.data && order.orderdItem.data.map(item => (
<div key={item.id} className='w-[300px]'>
 <div className='ml-20 '>
 <li className='text-xl font-bold'><span className='text-red-500'>id:</span> {item.id}</li>
  <li className='text-xl font-bold'><span className='text-red-500'>Quantity:</span> {item.quantity}</li>
 </div>
  {
       matchedData.map(data => {
          if (data.id == item.id) {
           return <div  key={data.id}> 

           <div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img  src={data.img} alt="Shoes" className="rounded-xl w-80 h-80" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{data.title}</h2>
    <p className='text-xl'>{data.price} $</p>
 
  </div>
</div>
           </div>
          } 
        })
  }
 

</div>
))}

{/* ....... */}

                  </div>
               
              </div>
          ))
     
         
      }
    </div>
   </div>
  </div>
    );
};

export default Orders;