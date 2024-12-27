import React, { useState } from 'react';
import { useGetProductsQuery, useDeleteProductMutation, useUpdateProductStatusMutation } from '../../ReactRedux/apiSlice';
import Title from '../Shared/Cards/Title/Title';
import Modal from './Modal';
import { Co2Sharp } from '@mui/icons-material';

const AllProducts = () => {
  const { data: products, refetch } = useGetProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [updateProductStatus, { isLoading: isUpdating }] = useUpdateProductStatusMutation();
  const [loadingId, setLoadingId] = useState(null);
  let [isOpen, setIsOpen] = useState(false);

  console.log(products)

  const handleClick = async (id) => {
    setLoadingId(id); // Set the loading ID to indicate which product is being deleted
    try {
      
      await deleteProduct(id).unwrap();
      refetch(); // Refetch data only if the deletion was successful
    } catch (error) {
      console.error('Error while deleting product', error);
    } finally {
      setLoadingId(null); // Reset loading ID
    }
  };

  const handleYes = async (id, name) => {
    setLoadingId(id); // Set the loading ID to indicate which product is being updated
    try {
      await updateProductStatus({ id, data: { [name]: 'yes' } }).unwrap();
      refetch();
    } catch (error) {
      console.error('Error while updating product status', error);
    } finally {
      setLoadingId(null); // Reset loading ID
    }
  };

  const handleNo = async (id, name) => {
    setLoadingId(id); // Set the loading ID to indicate which product is being updated
    try {
      await updateProductStatus({ id, data: { [name]: 'no' } }).unwrap();
      refetch();
    } catch (error) {
      console.error('Error while updating product status', error);
    } finally {
      setLoadingId(null); // Reset loading ID
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
              <tr key={item._id}>
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
                  <button
                    className={`btn ${item.highlighted === 'no' ? 'btn-warning hover:btn-secondary' : 'btn-success hover:btn-neutral'}`}
                    onClick={() => item.highlighted === 'no' ? handleYes(item._id, 'highlighted') : handleNo(item._id, 'highlighted')}
                    disabled={isUpdating && loadingId === item._id}
                  >
                    {isUpdating && loadingId === item._id ? 'Loading...' : item.highlighted === 'no' ? 'No' : 'Yes'}
                  </button>
                </td>
                <td>
                  <button
                    className={`btn ${item.hotDeals === 'no' ? 'btn-warning hover:btn-secondary' : 'btn-success hover:btn-neutral'}`}
                    onClick={() => item.hotDeals === 'no' ? handleYes(item._id, 'hotDeals') : handleNo(item._id, 'hotDeals')}
                    disabled={isUpdating && loadingId === item._id}
                  >
                    {isUpdating && loadingId === item._id ? 'Loading...' : item.hotDeals === 'no' ? 'No' : 'Yes'}
                  </button>
                </td>
                <td>
                  <button
                    className={`btn ${item.newlyArrived === 'no' ? 'btn-warning hover:btn-secondary' : 'btn-success hover:btn-neutral'}`}
                    onClick={() => item.newlyArrived === 'no' ? handleYes(item._id, 'newlyArrived') : handleNo(item._id, 'newlyArrived')}
                    disabled={isUpdating && loadingId === item._id}
                  >
                    {isUpdating && loadingId === item._id ? 'Loading...' : item.newlyArrived === 'no' ? 'No' : 'Yes'}
                  </button>
                </td>
                <td>
                  <button
                    className={`btn ${item.bestSells === 'no' ? 'btn-warning hover:btn-secondary' : 'btn-success hover:btn-neutral'}`}
                    onClick={() => item.bestSells === 'no' ? handleYes(item._id, 'bestSells') : handleNo(item._id, 'bestSells')}
                    disabled={isUpdating && loadingId === item._id}
                  >
                    {isUpdating && loadingId === item._id ? 'Loading...' : item.bestSells === 'no' ? 'No' : 'Yes'}
                  </button>
                </td>
                <td>
                  <button
                    className='btn btn-warning hover:btn-error'
                    onClick={() => handleClick(item._id)}
                    disabled={isDeleting && loadingId === item._id}
                  >
                    {isDeleting && loadingId === item._id ? 'Deleting...' : 'Delete'}
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
