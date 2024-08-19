import React, { useRef, useState } from "react";
import { ShoppingCart } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Democard = ({ addToCart, data }) => {

  const notify = () =>
    toast("🦄 Item has added to cart!!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const [prevPage, setPrevPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const bestsellersRef = useRef(null);

  if(data.length === 0){
    return (<div><h5>No data</h5></div>)
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

    // Scroll to top of the Bestsellers component
    if (bestsellersRef.current) {
      bestsellersRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#dcdcdc",
  };

  const cardStyle = {
    width: "100%",
    background: "#fff",
    position: "relative",
    overflow: "hidden",
    transition: "0.5s ease-in-out",
  };

  const imgBxStyle = {
    position: "relative",
    width: "100%",
    height: "310px",
    overflow: "hidden",
  };

  const imgStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "0.5s ease-in-out",
    transformOrigin: "right",
  };

  const contentStyle = {
    padding: "10px",
  };

  const productNameStyle = {
    fontSize: "18px",
    fontWeight: 500,
    color: "#333",
    margin: "5px 0",
  };

  const priceRatingStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const priceStyle = {
    fontSize: "20px",
    color: "#ff2020",
    fontWeight: 500,
  };

  const actionStyle = {
    position: "absolute",
    top: "188px",
    right: "30px",
 
  };

  const actionLiStyle = {
    position: "relative",
    listStyle: "none",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "4px",
    cursor: "pointer",
    transition: "0.5s",
    transform: "translateX(90px)",
  };

  const actionLiHoverStyle = {
    background: "#ff2020",
    color: "#fff",
  };

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
     <div style={containerStyle}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gridGap: "20px", padding: "20px", width: "1700px" }}>
        {data.map((items) => (
          <div
            key={items._id}
            style={cardStyle}
            onMouseOver={(e) => {
              const img = e.currentTarget.querySelector("img");
              img.style.transform = "scale(1.5)";
              const actions = e.currentTarget.querySelectorAll(".action li");
              actions.forEach((li, i) => {
                li.style.transform = "translateX(0)";
              });
            }}
            onMouseOut={(e) => {
              const img = e.currentTarget.querySelector("img");
              img.style.transform = "scale(1)";
              const actions = e.currentTarget.querySelectorAll(".action li");
              actions.forEach((li) => {
                li.style.transform = "translateX(90px)";
              });
            }}
          >
            <div style={imgBxStyle}>
              <img
                style={imgStyle}
                src={items.img}
                alt=""
              />
              <ul className="action" style={actionStyle}>
                <li
                  style={{ ...actionLiStyle, transitionDelay: "0.3s" }}
                >
                  <button onClick={() => {
                    addToCart(items);
                    notify();
                  }} className="btn  btn-xs items-center hover:bg-slate-500">
                    <span className='-mt-2'><ShoppingCart /></span>
                  </button>
                </li>
                <li
                  style={{ ...actionLiStyle, transitionDelay: "0.3s" }}
                >
                  <i className="fa fa-eye" aria-hidden="true"></i>
                  <Link to={`details/${items.id}`} state={{ data: items }} className="btn btn-xs hover:bg-red-500 zoomIn">Details</Link>
                </li>
              </ul>
            </div>
            <div style={contentStyle}>
              <div style={productNameStyle}>{items.title}</div>
              <div style={priceRatingStyle}>
                <h2 style={priceStyle}>{items.price}</h2>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa fa-star${i < 4 ? "" : " grey"}`} aria-hidden="true"></i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
  
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
 </div>
  );
};

export default Democard;
