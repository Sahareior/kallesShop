import React, { useEffect, useState } from 'react';
import useData from '../Hooks/useData';
import Title from '../Shared/Cards/Title/Title';
import Modal from './Modal';
import { useMutation } from '@tanstack/react-query';

const AllProducts = () => {
 const [data,refetch] = useData()
 let [isOpen, setIsOpen] = useState(false)

    const handleClick = async (id) => {
        try {
          const response = await fetch(`https://app-flame-five.vercel.app/products/${id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            refetch(); // Refetch data only if the deletion was successful
          } else {
            console.error('Failed to delete product');
          }
        } catch (error) {
          console.error('Error while deleting product', error);
        }
      };

      const { mutate: updateStatus } = useMutation(
        async ({ id, data,name }) => {
          console.log(name)
          const res = await fetch(`https://app-flame-five.vercel.app/products/${id}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            
            body: JSON.stringify({ data,name }),
          });
          return res.json();
        }
      );

      const handleYes =(id,name)=>{
        updateStatus({id, data:'yes',name: name})
        
        refetch()
      }

      const handleNo =(id,name)=>{
        updateStatus({id,data:"no", name:name})
        refetch()
      }


      

    return (
        <div>
           <div className='mt-14'>
             <Title text={"All Products"} />
           </div>
           <div>
           
           <div className="overflow-x-auto">
  <table className="table table-lg table-pin-rows text-xl table-pin-cols">
    <thead>
      <tr>
        <th></th> 
        <td>Image</td> 
        <td>Title</td>
        <td>Gender</td> 
        <td>Highlighted</td> 
        <td>HotDeal</td> 
        <td>Newwly Arrived</td> 
        <td>BestSells</td>
        <td>Delete</td>
        <td>Edit</td>
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
            <td>{items.highlighted === "no"? <button className='btn btn-warning hover:btn-secondary' onClick={()=>handleYes(items._id,"highlighted")}>No</button>: <button className='btn btn-success hover:btn-neutral' onClick={()=>handleNo(items._id)}>Yes</button>}</td> 
            <td>{items.hotDeals === "no"? <button onClick={()=>handleYes(items._id,"hotdeals")} className='btn btn-warning hover:btn-secondary'>No</button>: <button onClick={()=>handleNo(items._id, "hotdeals")} className='btn btn-success hover:btn-neutral'>Yes</button>}</td> 
            <td>{items.newlyArrived === "no"? <button onClick={()=>handleYes(items._id,"newly")} className='btn btn-warning hover:btn-secondary'>No</button>: <button onClick={()=>handleNo(items._id, "newly")} className='btn btn-success hover:btn-neutral'>Yes</button>}</td> 
            <td>{items.bestSells === "no"? <button onClick={()=>handleYes(items._id,"bestsells")} className='btn btn-warning hover:btn-secondary'>No</button>: <button onClick={()=>handleNo(items._id, "bestsells")} className='btn btn-success hover:btn-neutral'>Yes</button>}</td>
            <td><button onClick={()=>handleClick(items._id)} className='btn btn-warning hover:btn-error'>Delete</button></td>
            <td><Modal items={items} isOpen={isOpen} setIsOpen={setIsOpen}></Modal></td>
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
    
        </div>
    );
};

export default AllProducts;