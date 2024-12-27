import { Link, useLocation } from "react-router-dom";
import Demo from "../CardPic/Demo";
import './Details.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Headings from "../Shared/Headings";
import PopulerProducts from "../Page/Populer-Products/PopulerProducts";
import { useEffect, useState } from "react";
import { addToDb } from '../Hooks/useTools';
import useCon from "../Hooks/useCon";

const Details = () => {
    const { setCartPrice, cartPrice, isDarkMode } = useCon();
    const location = useLocation();
    const data = location.state.data;

    const { img, _id, title, zoomImage, price, category } = location.state.data;
    const receivedData = location.state.data;
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);  // Scroll to top on component mount
    }, []);

    const increaseValue = () => setQuantity(prev => prev + 1);
    const decreaseValue = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

    const addToCart = () => {
        const isDuplicate = cartPrice.find((item) => item._id === data._id);
        if (!isDuplicate) {
            setCartPrice([...cartPrice, data]);
            addToDb(data._id);
        } else {
            console.log('Item is already in the cart');
        }
    };

    const total = price * quantity;

    return (
        <div className="my-10 py-4 md:px-20">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            
            <div className="md:flex gap-10 justify-center items-start bg-white shadow-lg py-6 rounded-lg">
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                    <Demo img={img} zoomImage={zoomImage} />
                </div>

                {/* Product Details Section */}
                <div className="w-full px-8 md:w-1/2 mt-6 md:mt-0">
                    <h3 className="text-3xl font-semibold text-gray-900">{title}</h3>
                    <h3 className="text-2xl text-blue-500 mt-2">$ {price}</h3>

                    <div className="flex flex-col gap-4 mt-6">
                        <h4 className="text-xl font-medium">Availability: <span className="text-green-500">In stock</span></h4>
                        <h4 className="text-lg text-gray-500">Product Code: <span className="text-gray-600">#4657</span></h4>
                    </div>

                    <ul className="list-disc list-inside mt-6 space-y-2 text-lg text-gray-700">
                        <li>Dark blue suit for a tone-on-tone look</li>
                        <li>Regular fit</li>
                        <li>100% Cotton</li>
                        <li>Free shipping with 4 days delivery</li>
                    </ul>

                    {/* Price and Add to Cart Section */}
                    <div className="mt-16">
       

                        <button 
                            onClick={addToCart} 
                            className="btn bg-blue-600 hover:bg-blue-700  text-white py-2 px-8 rounded-lg mt-6 transition-all"
                        >
                            <ShoppingCartIcon className="mr-2"/> Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Similar Products Section */}
            <div className="mt-16">
                <Headings text="Similar Choices" />
                <div className="mt-10">
                    <PopulerProducts id={receivedData._id} category={category} />
                </div>
            </div>
        </div>
    );
};

export default Details;
