import React, { useEffect, useState } from 'react';
import Card from '../Shared/Cards/Card';
import Headings from '../Shared/Headings';
import Banner from '../Shared/Banner';
import useCon from '../Hooks/useCon';
import { addToDb, getShoppingCart } from '../Hooks/useTools';

const Men = ({newData,isLoading,isDarkMode}) => {
    const {setCartPrice,cartPrice} = useCon()
    

    const [prevpage, setPrevpage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;




    // Function to handle page changes
    const handlePageChange = (pageNumber) => {
        if (prevpage > pageNumber) {
            // Navigated back, so we should reset the current page if necessary
            const totalPages = Math.ceil(newData.length / itemsPerPage);
            const lastPage = totalPages === 0 ? 1 : totalPages;
            setCurrentPage(pageNumber < 1 ? 1 : pageNumber > lastPage ? lastPage : pageNumber);
        } else {
            setCurrentPage(pageNumber);
        }
        setPrevpage(pageNumber);
    };

    // Calculate the index range for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPages = Math.ceil(newData.length / itemsPerPage);
    const currentData = newData.slice(indexOfFirstItem, indexOfLastItem);

   // Inside your addToCart function
const addToCart = (data) => {
    // Check if the item with the same ID already exists in cartPrice
    const isDuplicate = cartPrice.find(item => item.id === data.id);
  
    if (!isDuplicate) {
      // Item is not a duplicate, update the cartPrice state and add to database
      setCartPrice([...cartPrice, data]);
      addToDb(data.id);
    } else {
      // Item is a duplicate, you might want to show an error message or handle it differently
      console.log('Item is already in the cart');
    }
  };
  
if(isLoading){
    return <div>loading.....</div>
}

    return (
      <div  className=''>
         <Headings text={"Our Product"}></Headings>
          <div className={`${isDarkMode? 'bg-black': ''}`}>
           
            <div className='grid grid-cols-2 items-center md:justify-items-center md:px-28 pb-6 md:grid-cols-4 '>
                {currentData.map(info => <Card key={info._id} addToCart={addToCart} id={info._id} info={info} img={info.img} img2={info.img2} title={info.title}></Card>)}
            </div>
            <div className="flex justify-center gap-3 mt-4 mb-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`btn ${
                            currentPage === index + 1 ? "btn-primary" : "btn-secondary"
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <Banner img={"https://new-ella-demo.myshopify.com/cdn/shop/files/h17f5-image-banner-2.jpg?v=1641349544&width=1500"} />
        </div>
      </div>
    );
};

export default Men;
