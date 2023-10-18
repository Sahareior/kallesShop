import React, { useEffect, useState } from 'react';
import './Tabs.css';
import Men from '../Product-Cate/Men';
import Women from '../Product-Cate/Women';
import Kids from '../Product-Cate/Accesorices';
import useIsMobile from '../Hooks/useIsMobile';
import MobileView from '../Products Cat/MobileView';
import useCon from '../Hooks/useCon';
import { addToDb } from '../Hooks/useTools';
import useData from '../Hooks/useData';
import { Dna } from 'react-loader-spinner';

const Tabs = () => {
  const { setCartPrice, cartPrice } = useCon();
  const [activeTab, setActiveTab] = useState('Men');
  const [data, isLoading] = useData();
  const verify = useIsMobile();

  useEffect(() => {
    // Your tab and switchers event listeners...
  }, []);

  const newData = data.filter(info => info.gender === "male");
  const femaleData = data.filter(info => info.gender === "female");
  const accesorices = data.filter(info => info.gender === "accesorices");

  const addToCart = (data) => {
    // Check if the item with the same ID already exists in cartPrice
    const isDuplicate = cartPrice.find(item => item._id === data._id);

    if (!isDuplicate) {
      // Item is not a duplicate, update the cartPrice state and add to database
      setCartPrice([...cartPrice, data]);
      addToDb(data._id);
    } else {
      // Item is a duplicate, you might want to show an error message or handle it differently
      console.log('Item is already in the cart');
    }
  };
console.log(isLoading)
  const renderComponent = () => {
    switch (activeTab) {
      case 'Kids':
        if (verify) {
          return <MobileView isLoading={isLoading} data={accesorices} />;
        } else {
          return <Kids isLoading={isLoading} accesorices={accesorices} />;
        }
      case 'Women':
        if (verify) {
          return <MobileView isLoading={isLoading} data={femaleData} />;
        } else {
          return <Women isLoading={isLoading} femaleData={femaleData} />;
        }
      case 'Men':
        if (verify) {
          return <MobileView isLoading={isLoading} addToCart={addToCart} data={newData} />;
        } else {
          return <Men isLoading={isLoading} newData={newData} />;
        }
      default:
        return null;
    }
  };



  return (
    <div>
      <div className="tabbed mt-9 ">
        <ul>
          <li>Accesorices</li>
          <li>Women</li>
          <li className="active">Men</li>
        </ul>
      </div>
      {renderComponent()}
    </div>
  );
};

export default Tabs;
