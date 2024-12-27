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
  const url = `https://kellas.vercel.app/orders?date=${date}`;
  
  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      // Sort the result by newest date (orderdTime)
      const sortedResult = result.sort((a, b) => {
        // Convert the orderdTime to Date objects for comparison
        const dateA = new Date(a.orderdTime);
        const dateB = new Date(b.orderdTime);
        return dateB - dateA; // Sort by descending order (newest first)
      });
      
      setItem(sortedResult); // Set the sorted items
    });
}, [date]);

// console.log(item)
  const idArray = item.flatMap(items => {
      if (items && items.orderdItem && items.orderdItem.data) {
        return items.orderdItem.data.flatMap(dataItem => dataItem.id);
      } else {
        return []; // Return an empty array if the data is not available
      }
    });
    


  const matchedData = [];
  const idSet = new Set(); // Set to keep track of unique IDs
  
  for (const _id of idArray) {
      // Check if the id is not already in the Set
      if (!idSet.has(_id)) {
          const exists = data.find(info => info._id == _id);
          if (exists) {
              matchedData.push(exists);
              idSet.add(_id); // Add the id to the Set
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

console.log(item)
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
 
   <div className='flex  flex-col items-center p-8 gap-8 bg-gray-100'>
  {item.length > 0 && item.map(order => (
    <div className='w-full relative  max-w-6xl bg-white rounded-lg shadow-md p-6 border border-gray-300' key={order._id}>
      {/* Order Details Section */}
      <div className='flex flex-col  gap-6'>
        <div className='flex flex-col gap-3 text-gray-700'>
          <h4 className='flex items-center text-lg'><CalendarMonth className='mr-2' /> <span>Date:</span>  {order.orderDate}</h4>
          <h4 className='flex items-center text-lg'><Person2Outlined className='mr-2' /> <span>Name:</span> {order.orderdItem.name}</h4>
          <h4 className='flex items-center text-lg'><EmailOutlined className='mr-2' /> <span>Email:</span> {order.orderdItem.email}</h4>
          <h4 className='flex items-center text-lg'><LocationCityOutlined className='mr-2' /> <span>Address:</span> {order.orderdItem.address}</h4>
          <h4 className='flex items-center text-lg'><PhoneAndroidOutlined className='mr-2' /> <span>Phone:</span> {order.orderdItem.phone}</h4>
          <h4 className='text-red-600 flex items-center text-lg'><MoneyOffTwoTone className='mr-2' /> <span>Total:</span> {order.orderdItem.total} $</h4>
        </div>
          <h4 className={`border rounded-lg absolute right-5 top-4 text-center w-36 px-2 py-1 ${order.paid ? 'bg-green-500 border-green-600' : 'bg-red-500 border-red-600'} text-white`}>
            Paid: {order.paid ? "Yes" : "No"}
          </h4>
<div className='border-teal-300 border-b-2 w-full'></div>
        {/* Ordered Items Section */}
        <div className='flex mt-4 md:mt-0 gap-8 w-full overflow-x-auto'>
          {order.orderdItem.data && order.orderdItem.data.map(item => (
            <div key={item._id} className='min-w-[250px] bg-gray-50 rounded-lg p-4 shadow-lg'>
              <ul className='text-left space-y-2'>
                {/* <li className='text-lg font-semibold'><span className='text-red-500'>ID:</span> {item._id}</li> */}
                <li className='text-lg font-semibold'><span className='text-red-500'>Quantity:</span> {item.quantity}</li>
              </ul>

              {/* Matched Data */}
              {matchedData.map(data => {
                if (item.id === data._id) {
                  return (
                    <div key={data._id} className="mt-4">
                      <div className="card w-full bg-white shadow-md rounded-lg">
                        <figure className="px-4 pt-4">
                          <img src={data.img} alt={data.title} className="rounded-lg object-cover h-40 w-full" />
                        </figure>
                        <div className="card-body text-center">
                          <h2 className="card-title text-xl font-semibold">{data.title}</h2>
                          <p className="text-lg text-gray-700">{data.price} $</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  ))}
</div>

   </div>
  </div>
    );
};

export default Orders;