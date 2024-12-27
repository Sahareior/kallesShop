import React, { useEffect, useRef, useState } from 'react';
import Card from '../Shared/Cards/Card';
import Banner from '../Shared/Banner';
import { addToDb } from '../Hooks/useTools';
import useCon from '../Hooks/useCon';
import { Dna } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { addCart } from '../../ReactRedux/taskSlice';

const CommonTab = ({ data, isLoading, isDarkMode }) => {
    const { setCartPrice, cartPrice } = useCon();
    const cardContainerRef = useRef(null);
    const [prevPage, setPrevPage] = useState(0);
    const dispatch =   useDispatch()
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationClicked, setPaginationClicked] = useState(false); 
    const itemsPerPage = 6;

    // Fix: Return JSX properly if no data
    if (!data) {
        return <h3>Loading</h3>;
    }
  
    const handlePageChange = (pageNumber) => {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        const lastPage = totalPages === 0 ? 1 : totalPages;
        setCurrentPage(pageNumber < 1 ? 1 : pageNumber > lastPage ? lastPage : pageNumber);
        setPrevPage(pageNumber);
        setPaginationClicked(true); 
    };

    useEffect(() => {
        if (paginationClicked && cardContainerRef.current) {
            cardContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setPaginationClicked(false); 
        }
    }, [currentPage, paginationClicked]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    const addToCart = (data) => {
        // dispatch(addCart(data))
        const isDuplicate = cartPrice.find(item => item._id === data._id);
        if (!isDuplicate) {
            setCartPrice([...cartPrice, data]);
            addToDb(data._id);
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
        <div className="" ref={cardContainerRef}>
        {/* Center the card container horizontally */}
        <div className="w-full flex justify-center">
            {/* Card container with justify-start but centered within its parent */}
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  justify-start "
              
            >
                {currentData.map((info) => (
                    <Card
                        key={info._id}
                        id={info._id}
                        addToCart={addToCart}
                        info={info}
                        img={info.img}
                        img2={info.img2}
                        title={info.title}
                    />
                ))}
            </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-3 mt-8 mb-4">
            <p className="font-bold"> {"<<"}</p>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    className={`btn ${
                        currentPage === index + 1
                            ? "btn-block bg-slate-500 btn-md"
                            : "btn-ghost btn-md"
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
            <p className="font-bold">{">>"}</p>
        </div>

        {/* Banner */}
      <div className='mt-12'>
                <Banner img={"https://new-ella-demo.myshopify.com/cdn/shop/files/h17f5-image-banner-2.jpg?v=1641349544&width=1500"} />
            </div>
    </div>
    );
};

export default CommonTab;
