import React from 'react';
import Headings from '../Shared/Headings';
import Newarrivals from '../Products Cat/Newarrivals';
import Bestsellers from '../Products Cat/Bestsellers';
import MobileView from '../Products Cat/MobileView';
import useIsMobile from '../Hooks/useIsMobile';
import { addToDb } from '../Hooks/useTools';
import useCon from '../Hooks/useCon';
import useData from '../Hooks/useData';

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
    <div className={`mt-14 border-2 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="md:flex hidden md:visible justify-between">
        <div className="ml-[600px]">
          <Headings text={"Best Sells"} />
        </div>
        <div className="mr-24">
          <Headings text={"Newly rrArrived"} />
        </div>
      </div>
      <div className="md:flex w-full items-center md:justify-between gap-2">
        <div className="flex justify-center items-center flex-col">
          {verify ? (
            <MobileView data={bestSellers} addToCart={addToCart} text={"Best Sells"} />
          ) : (
            <Bestsellers isDarkMode={isDarkMode} addToCart={addToCart} data={newArrivals} />
          )}
        </div>
        <div className="md:w-5/6 w-full md:-mt-7 flex flex-col justify-center md:mr-52 md:backdrop:px-16">
          <div className="flex justify-center items-center flex-col">
            {verify ? (
              <MobileView data={newArrivals} addToCart={addToCart} text={"New Arrives"} />
            ) : (
              <Newarrivals isDarkMode={isDarkMode} addToCart={addToCart} data={newArrivals} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
