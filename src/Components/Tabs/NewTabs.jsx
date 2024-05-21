import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import MobileView from '../Products Cat/MobileView';
import Men from '../Product-Cate/Men';
import Women from '../Product-Cate/Women';
import Kids from '../Product-Cate/Accesorices';
import { useState, useEffect } from 'react';
import useCon from '../Hooks/useCon';
import useIsMobile from '../Hooks/useIsMobile';
import { addToDb } from '../Hooks/useTools';
import { Headphones, Man3, Woman2TwoTone } from '@mui/icons-material';
import useData from '../Hooks/useData';

export default function NewTab() {
  const [value, setValue] = React.useState(1);
  const { setCartPrice, cartPrice, isDarkMode } = useCon();
  const [data] = useData();
  const verify = useIsMobile();

  const newData = data.filter((info) => info.gender === 'male');
  const femaleData = data.filter((info) => info.gender === 'female');
  const accesorices = data.filter((info) => info.gender === 'accesorices');

  const addToCart = (data) => {
    const isDuplicate = cartPrice.find((item) => item.id === data.id);
    if (!isDuplicate) {
      setCartPrice([...cartPrice, data]);
      addToDb(data.id);
    } else {
      console.log('Item is already in the cart');
    }
  };

  const renderComponent = () => {
    switch (value) {
      case 0:
        if (verify) {
          return <MobileView addToCart={addToCart} isDarkMode={isDarkMode} data={accesorices} />;
        } else {
          return <Kids isDarkMode={isDarkMode} accesorices={accesorices} />;
        }
      case 1:
        if (verify) {
          return <MobileView addToCart={addToCart} data={femaleData} />;
        } else {
          return <Women isDarkMode={isDarkMode} femaleData={femaleData} />;
        }
      case 2:
        if (verify) {
          return <MobileView addToCart={addToCart} data={newData} />;
        } else {
          return <Men isDarkMode={isDarkMode} newData={newData} />;
        }
      default:
        return null;
    }
  };

  return (
    <div className=''>
      
      <div className='flex justify-center items-center mt-3'>
        <Tabs
          className={`py-3 'bg-neutral-500`} // Set text color based on dark mode
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          aria-label="icon label tabs example"
        >
          <Tab icon={<Headphones className={`${isDarkMode ? 'text-white' : 'text-black'}`} />}   label={
    <span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Accesorices</span>
  } />
          <Tab icon={<Woman2TwoTone className={`${isDarkMode ? 'text-white' : 'text-black'}`} />}   label={
    <span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Women</span>
  }/>
          <Tab className='active' icon={<Man3 className={`${isDarkMode ? 'text-white' : 'text-black'}`} />}   label={
    <span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Men </span>
  } />
        </Tabs>
      </div>
      {renderComponent()}
    </div>
  );
}
