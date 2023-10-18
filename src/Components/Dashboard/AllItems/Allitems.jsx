import React, { useEffect, useState } from 'react';
import useData from '../../Hooks/useData';
import { useLocation } from 'react-router-dom';

const Allitems = () => {
    const items = useData()
    console.log(items)
    const location = useLocation()
    console.log(location.state)
    const data = location.state
    return (
        <div>
           
           <div className="overflow-x-auto">
  <table className="table table-lg table-pin-rows table-pin-cols">
    <thead>
      <tr>
        <th></th> 
        <td>Name</td> 
        <td>Gender</td> 
        <td>Highlighted</td> 
        <td>HotDeal</td> 
        <td>Newwly Arrived</td> 
        <td>BestSells</td>
        <th></th> 
      </tr>
    </thead> 
    <tbody>
     {
        data.map((items,index) =>  <tr key={items.id}>
             <th>{index+1}</th> 
            <th>      <td>
          <div className="flex items-center space-x-3">
            <div className="">
              <div className="mask mask-squircle w-24">
                <img src={items.img} />
              </div>
            </div>
     
          </div>
        </td></th> 
            <td>{items.title}</td> 
            <td>{items.gender}</td> 
            <td>{items.highlighted}</td> 
            <td>{items.hotDeals}</td> 
            <td>{items.newlyArrived}</td> 
            <td>{items.bestSells}</td>
          
          </tr>)
     }
   
    </tbody> 
    <tfoot>
      <tr>
        <th></th> 
        <td>Name</td> 
        <td>Job</td> 
        <td>company</td> 
        <td>location</td> 
        <td>Last Login</td> 
        <td>Favorite Color</td>
        <th></th> 
      </tr>
    </tfoot>
  </table>
</div>
        </div>
    );
};

export default Allitems;


