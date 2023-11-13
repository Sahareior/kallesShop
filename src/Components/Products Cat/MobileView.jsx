import React, { useState } from "react";
import Headings from "../Shared/Headings";
import { Link } from "react-router-dom";
import { ShoppingCartSharp } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MobileView = ({ data, text, addToCart }) => {
  const notify = () =>
    toast("🦄 Item has added to cart!!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const [prevpage, setPrevpage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handlePageChange = (pageNumber) => {
    if (prevpage > pageNumber) {
      // Navigated back, so we should reset the current page if necessary
      const totalPages = Math.ceil(data?.length / itemsPerPage);
      const lastPage = totalPages === 0 ? 1 : totalPages;
      setCurrentPage(
        pageNumber < 1 ? 1 : pageNumber > lastPage ? lastPage : pageNumber
      );
    } else {
      setCurrentPage(pageNumber);
    }
    setPrevpage(pageNumber);
  };

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const currentData = data?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Headings text={text}></Headings>
      <div className="grid grid-cols-2 gap-2 p-2 justify-items-center">
        {currentData.map((item) => (
          <div key={item._id} className=" h-[300px]">
            <div className="">
              <div className="h-52 w-full">
                <img
                  src={item.img}
                  alt="Product"
                  className="md:w-1/3 rounded-t-lg md:rounded-l-lg md:rounded-t-none object-cover h-full w-full md:h-auto"
                />
              </div>
              <div className="p-1">
                <p className=" ">{item.title}</p>
                <p className="-mt-0">${item.price}</p>
                <div className="flex gap-4 mt-1  justify-between">
                  <Link
                    to={`/mobile/details/${item.id}`}
                    state={{ data: item }}
                  >
                    <button className="btn btn-secondary btn-sm">
                      Buy Now
                    </button>
                  </Link>
                  {/* details/ */}
                  <button
                    onClick={() => {
                      addToCart(item);
                      notify();
                    }}
                    className="btn btn-primary flex items-center justify-center btn-sm"
                  >
                    <span className="-mt-2">
                      <ShoppingCartSharp></ShoppingCartSharp>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3 my-5 ">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`btn ${
              currentPage === index + 1 ? "btn-warning" : "btn-neutral"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileView;
