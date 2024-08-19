// AllProducts.js
import React, { useState } from 'react';
import { useGetProductsQuery, useDeleteProductMutation, useUpdateProductStatusMutation } from '../../ReactRedux/apiSlice';
import Title from '../Shared/Cards/Title/Title';
import Modal from './Modal';

const AllProducts = () => {
  const { data: products, refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProductStatus] = useUpdateProductStatusMutation();
  let [isOpen, setIsOpen] = useState(false);

  const handleClick = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      refetch(); // Refetch data only if the deletion was successful
    } catch (error) {
      console.error('Error while deleting product', error);
    }
  };

  const handleYes = async (id, name) => {
  console.log(name)
    try {
      await updateProductStatus({ id, data: { [name]: 'yes' } }).unwrap();
      refetch();
    } catch (error) {
      console.error('Error while updating product status', error);
    }
  };
  
  const handleNo = async (id, name) => {
    try {
      await updateProductStatus({ id, data: { [name]: 'no' } }).unwrap();
      refetch();
    } catch (error) {
      console.error('Error while updating product status', error);
    }
  };
  
  return (
    <div>
      <div className='mt-14'>
        <Title text={"All Products"} />
      </div>
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
              <td>Newly Arrived</td>
              <td>BestSells</td>
              <td>Delete</td>
              <td>Edit</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item, index) => (
              <tr key={item.id}>
                <th>{index + 1}</th>
                <th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="">
                        <div className="mask mask-squircle w-24">
                          <img src={item.img} />
                        </div>
                      </div>
                    </div>
                  </td>
                </th>
                <td>{item.title}</td>
                <td>{item.gender}</td>
                <td>
                  {item.highlighted === 'no' ? (
                    <button
                      className='btn btn-warning hover:btn-secondary'
                      onClick={() => handleYes(item._id, 'highlighted')}
                    >
                      No
                    </button>
                  ) : (
                    <button
                      className='btn btn-success hover:btn-neutral'
                      onClick={() => handleNo(item._id, 'highlighted')}
                    >
                      Yes
                    </button>
                  )}
                </td>
                <td>
                  {item.hotDeals === 'no' ? (
                    <button
                      className='btn btn-warning hover:btn-secondary'
                      onClick={() => handleYes(item._id, 'hotDeals')}
                    >
                      No
                    </button>
                  ) : (
                    <button
                      className='btn btn-success hover:btn-neutral'
                      onClick={() => handleNo(item._id, 'hotDeals')}
                    >
                      Yes
                    </button>
                  )}
                </td>
                <td>
                  {item.newlyArrived === 'no' ? (
                    <button
                      className='btn btn-warning hover:btn-secondary'
                      onClick={() => handleYes(item._id, 'newlyArrived')}
                    >
                      No
                    </button>
                  ) : (
                    <button
                      className='btn btn-success hover:btn-neutral'
                      onClick={() => handleNo(item._id, 'newlyArrived')}
                    >
                      Yes
                    </button>
                  )}
                </td>
                <td>
                  {item.bestSells === 'no' ? (
                    <button
                      className='btn btn-warning hover:btn-secondary'
                      onClick={() => handleYes(item._id, 'bestSells')}
                    >
                      No
                    </button>
                  ) : (
                    <button
                      className='btn btn-success hover:btn-neutral'
                      onClick={() => handleNo(item._id, 'bestSells')}
                    >
                      Yes
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className='btn btn-warning hover:btn-error'
                    onClick={() => handleClick(item._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Modal items={item} refetch={refetch} isOpen={isOpen} setIsOpen={setIsOpen}></Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
