import { Link, useLocation } from "react-router-dom";
import Demo from "../CardPic/Demo";
import './Details.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Headings from "../Shared/Headings";
import PopulerProducts from "../Page/Populer-Products/PopulerProducts";
import { useEffect, useState } from "react";
import useData from "../Hooks/useData";

const Details = () => {
    const [data] = useData()
    const location = useLocation()
    const {img,img2,id,title,zoomImage,price,category} = location.state.data
    const receivedData = location.state.data 
    console.log(receivedData)

    const [quantity, setQuantity] = useState(1); // Add state to manage quantity.

   const increaseValue =()=>{
    setQuantity(prev => prev+1)
   }
   const decreaseValue =()=>{
    setQuantity(prev => prev>1 && prev-1)
   }


   const idQuantityArray = [{ id: id, quantity: quantity }];
   const total = price * quantity


    return (
        <div className="my-12 ">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />

            <div className="md:flex gap-8 justify-around items-center">
                <div className="">
                    <Demo img={img} zoomImage={zoomImage}></Demo>
                </div>
                <div className="ml-4">
                    

                    <h3 className="text-2xl font-bold">{title}</h3>
                    <h3 className="text-lg mt-2">$ {price}</h3>

                    <div className="about">
                        <p>Availability: <span>In stock</span></p>
                        <p>Product Code: <span>#4657</span></p>
                        {/* <p>Tags: <span>Fashion, Hood, Classic</span></p> */}
                    </div>

                     <ul>
                        <li>Dark blue suit for a tone-on-tone look</li>
                        <li>Regular fit</li>
                        <li>100% Cotton</li>
                        <li>Free shipping with 4 days delivery</li>
                    </ul>

                    
                    <div className="mt-9">
    <div className="md:flex ">
        <h3>Choose your quantity :</h3>
        <div className="quantity-field md:ml-9" >
                    <button
                    className="value-button decrease-button"
                    onClick={() => decreaseValue()}
                    title="Azalt"
                >-</button>
   <div className="number">{quantity>0? quantity: 0}</div>
  <button 
    className="value-button increase-button" 
    onClick={()=> increaseValue()}
    title="Arrtır"
  >+
  </button>
</div>
    </div>
    <h4 className="text-red-600 my-3">Total Price: {total}$</h4>
            <div className="md:flex justify-end mt-6">

                       <Link to='/checkout' state={{data:idQuantityArray, total:total}}><button className="btn btn-secondary"> Buy Now</button></Link>
                  
                </div>                 
                   </div>
                </div>
            </div>
          <div className="md:my-32 mt-24">
          <Headings text={'Simmiler Choices'} />
          <div className=" mt-14 ">
          <div className="">
          <PopulerProducts category={category}></PopulerProducts>
          </div>
          </div>
          </div>
        </div>
    );
};

export default Details;
