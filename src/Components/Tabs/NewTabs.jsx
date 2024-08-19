import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MobileView from '../Products Cat/MobileView';
import useCon from '../Hooks/useCon';
import useIsMobile from '../Hooks/useIsMobile';
import { addToDb } from '../Hooks/useTools';
import { Headphones, Man3, Woman2TwoTone } from '@mui/icons-material';
import useData from '../Hooks/useData';
import CommonTab from '../Product-Cate/CommonTab';

export default function NewTab() {
  const [value, setValue] = React.useState(1);
  const { setCartPrice, cartPrice, isDarkMode } = useCon();
  const [data] = useData();
  const verify = useIsMobile();
console.log(data)
  const male = data.filter((info) => info.gender === 'male');
  const femaleData = data.filter((info) => info.gender === 'female');
  const accesorices = data.filter((info) => info.gender === 'accessories');
console.log("accesorices",accesorices)
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
          return <div className=''><CommonTab isDarkMode={isDarkMode} data={accesorices} /></div>
        }
      case 1:
        if (verify) {
          return <MobileView addToCart={addToCart} data={femaleData} />;
        } else {
          // return <Women isDarkMode={isDarkMode} femaleData={femaleData} />;
          return <CommonTab isDarkMode={isDarkMode} data={femaleData} />
        }
      case 2:
        if (verify) {
          return <MobileView addToCart={addToCart} data={male} />;
        } else {
          return <CommonTab isDarkMode={isDarkMode} data={male} />;
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
