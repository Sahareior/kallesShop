import React, { useEffect, useState } from 'react';
import Card from '../Shared/Cards/Card';

import Banner from '../Shared/Banner';
import { addToDb } from '../Hooks/useTools';
import useCon from '../Hooks/useCon';
import { Dna } from 'react-loader-spinner';

const CommonTab = ({ data, isLoading, isDarkMode }) => {
    const { setCartPrice, cartPrice } = useCon();
    const [prevPage, setPrevPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    if(!data){
        <h3>Loading</h3>
    }

    const handlePageChange = (pageNumber) => {
        if (prevPage > pageNumber) {
            const totalPages = Math.ceil(data.length / itemsPerPage);
            const lastPage = totalPages === 0 ? 1 : totalPages;
            setCurrentPage(pageNumber < 1 ? 1 : pageNumber > lastPage ? lastPage : pageNumber);
        } else {
            setCurrentPage(pageNumber);
        }
        setPrevPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    const addToCart = (data) => {
        const isDuplicate = cartPrice.find(item => item.id === data.id);
        if (!isDuplicate) {
            setCartPrice([...cartPrice, data]);
            addToDb(data.id);
        } else {
            console.log('Item is already in the cart');
        }
    };

    if (isLoading) {
        return (
            <Dna
                visible={true}
                height="80"
                width="80"
                z-index="100"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        );
    }

    return (
        <div className={`${isDarkMode ? 'bg-black' : ''} `}>
            
            <div className='flex flex-wrap justify-center gap-x-5'>
                {currentData.map(info => (
                    <Card
                        key={info.id}
                        id={info._id}
                        addToCart={addToCart}
                        info={info}
                        img={info.img}
                        img2={info.img2}
                        title={info.title}
                    />
                ))}
            </div>
            <div className="flex justify-center items-center gap-3 mt-8 mb-4">
                <p className='font-bold'> {"<<"}</p>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`btn ${currentPage === index + 1 ? "btn-block bg-slate-500 btn-md" : "btn-ghost btn-md"}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <p className='font-bold'>{">>"}</p>
            </div>
            <Banner img={"https://new-ella-demo.myshopify.com/cdn/shop/files/h17f5-image-banner-2.jpg?v=1641349544&width=1500"} />
        </div>
    );
};

export default CommonTab;
