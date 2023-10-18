import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Female = () => {
    const [data,setData] = useState([])
    useEffect(()=>{
        fetch('allProducts.json')
        .then(res => res.json())
        .then(info => setData(info))
    },[])
    const newData = data.filter(info=> info.gender === "female")
    console.log(newData)
    return (
        <div>
           <div className='grid grid-cols-3 ml-12 mt-8'>
           {
                newData.map(info=> 
              <Link key={info.title} to={`/products/${info.id}`} state={{data:info}}>  <p  className='text-xl'>
              {info.category}
              </p></Link>
                
                )
            }
           </div>
        </div>
    );
};

export default Female;