import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Male = () => {
    const [data,setData] = useState([])
    useEffect(()=>{
        fetch('allProducts.json')
        .then(res => res.json())
        .then(info => setData(info))
    },[])
    const newData = data.filter(info=> info.gender === "male")
    console.log(newData)
    return (
        <div>
           <div className='grid grid-cols-3 ml-12 mt-8'>
           {
                newData.map(info=> 
              <Link key={info._id} to={`/products/${info._id}`} state={{data:newData}}>  <p  className='text-xl'>
              {info.category}
              </p></Link>
                
                )
            }
           </div>
        </div>
    );
};

export default Male;