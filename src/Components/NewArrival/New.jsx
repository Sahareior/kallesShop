import React from 'react';
import Headings from '../Shared/Headings';
import Newarrivals from '../Products Cat/Newarrivals';
import Bestsellers from '../Products Cat/Bestsellers';
import MobileView from '../Products Cat/MobileView';
import useIsMobile from '../Hooks/useIsMobile';
import { addToDb } from '../Hooks/useTools';
import useCon from '../Hooks/useCon';
import useData from '../Hooks/useData';
import Democard from '../Products Cat/Democard';

const New = () => {
  const [data] = useData();

  const { setCartPrice, cartPrice, isDarkMode } = useCon();
  const verify = useIsMobile();

  const newArrivals = Array.isArray(data) && data.filter(info => info.newlyArrived === 'yes');
  const bestSellers = Array.isArray(data) && data.filter(info => info.bestSells === 'yes');

  const addToCart = (data) => {
    const isDuplicate = cartPrice.find((item) => item.id === data.id);
    if (!isDuplicate) {
      setCartPrice([...cartPrice, data]);
      addToDb(data.id);
    } else {
      console.log('Item is already in the cart');
    }
  };

  return (
    <div >
      <div className="">
        <div className="mt-14 -mb-9 md:mb-9">
          <Headings text={"Newly Added"} />
        </div>

      </div>
      <div className="">
        <div >
          {verify ? (
            <MobileView data={bestSellers} addToCart={addToCart}  />
          ) : (
            <Democard addToCart={addToCart} data={newArrivals} />
          )}
        </div>
     
        <div className=" w-full  flex flex-col  justify-center  md:backdrop:px-16">
        <div className="mt-8 -mb-8 md:mb-5">
          <Headings text={"Best Sells"} />
        </div>
          <div >
            {verify ? (
              <MobileView data={bestSellers} addToCart={addToCart}  />
            ) : (
             <Democard addToCart={addToCart} data={bestSellers} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
