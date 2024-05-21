import { Link, useLocation } from "react-router-dom";
import Demo from "../CardPic/Demo";
import './Details.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Headings from "../Shared/Headings";
import PopulerProducts from "../Page/Populer-Products/PopulerProducts";
import { useEffect, useState } from "react";
import useData from "../Hooks/useData";

const Details = () => {
    window.scrollTo(0, 0);
    
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
        <div className="my-32">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />

            <div className="md:flex relative gap-8 justify-around items-center">
                <div className=" ">
                    <Demo img={img} zoomImage={zoomImage}></Demo>
                </div>
                <div className="ml-4">
                    

                    <h3 className="text-4xl font-bold">{title}</h3>
                    <h3 className="text-lg mt-2">$ {price}</h3>

                    <div className="about flex flex-col gap-5">
                        <h4 className="text-xl">Availability: <span className="text-xl text-green-500">In stock</span></h4>
                        <h4 className="text-xl ">Product Code: <span className="text-xl text-gray-400">#4657</span></h4>
                        {/* <p>Tags: <span>Fashion, Hood, Classic</span></p> */}
                    </div>

                     <ul>
                        <li className="text-xl mt-1">Dark blue suit for a tone-on-tone look</li>
                        <li className="text-xl mt-1">Regular fit</li>
                        <li className="text-xl mt-1">00% Cotton</li>
                        <li className="text-xl mt-1">Free shipping with 4 days delivery</li>
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
    <h4 className=" my-3">Total Price: <span className="text-red-500">{total}$</span></h4>
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
