import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import './FilterSystem.css'
import { useQuery } from '@tanstack/react-query';
import { FilterAltSharp } from '@mui/icons-material';
import { useEffect } from 'react';
import useCon from '../Hooks/useCon';

export default function FilterSystem({ setFilterData,setIsloading,categoriesData,filter,type,items }) {
  const {isDarkMode} = useCon()
  const [selectedSize, setSelectedSize] = React.useState('');
  const [color, setColor] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [category, setCategory] = React.useState(type || '');
  const [gender, setGender] = React.useState(filter || '');
  
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { newSize,categoriesBrand,categoriesColors,categoriesSize,categoriesType,product} = items

console.log('type:',type)
console.log('gender:',filter)



  const handleChange = (value, type) => {
    if (type === 'color') {
      setColor(color === value ? '' : value);
    } else if (type === 'size') {
      setSelectedSize(selectedSize === value ? '' : value);
    } else if (type === 'brand') {
      setBrand(brand === value ? '' : value);
    } else if (type === 'category') {
      setCategory(category === value ? '' : value);
    } else if (type === 'gender') {
      setGender(gender === value ? '' : value);
    }
  };

  console.log(type)
  useEffect(() => {
    // Update the URL whenever any filter changes
    const queryParams = [];
    if (selectedSize) {
      queryParams.push(`size=${selectedSize}`);
    }
    if (color || color === filter) {
      queryParams.push(`color=${color}`);
    }
    if (brand || brand === filter) {
      queryParams.push(`brand=${brand}`);
    }
    if (category || category === type  && category !== undefined) {
      queryParams.push(`category=${category}`);
    }
    if (product) {
      queryParams.push(`category=${product}`);
    }
    if (gender || gender === filter && gender !== undefined) {
      queryParams.push(`gender=${gender}`);
    }

    const queryString = queryParams.join('&');
    const url = `https://kellas.vercel.app/allproducts?${queryString}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setIsloading(result)
        setFilterData(result);
      });

      

  }, [selectedSize, color, brand, setFilterData, category, gender, filter,type,setIsloading,product]);

  useEffect(() => {
     if(filter){
      setGender(filter);
     }
      if(type === 'sunglass'){
      setGender('accesorices')
     }
      if(type === 'watch'){
      setGender('accesorices')
     }
      if (type){
      setCategory(type)
     }
     if(product){
      setGender('accesorices')
     }
     if(!product && filter){
      setGender(filter)
     }
  }, [filter,type,product]);



  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={toggleDrawer(anchor, false)}
      
    >
      <List>
        <div className='ml-7'>
          <h3 className='text-[#323232]'><u>Availability</u></h3>
          <div className="">
            <label className="flex">
              <span className="label-text text-xl">In Stock</span>
              <input type="checkbox" checked="checked" className="checkbox ml-2 checkbox-primary" />
            </label>
          </div>
        </div>
      </List>
      <List>
        <div className='ml-7'>
          <h3 className='text-[#323232]'><u>Colors</u></h3>
          {categoriesColors.map((designColor) => (
            <div key={designColor} className=' flex items-center'>
              <input
                type="checkbox"
                checked={color === designColor}
                onChange={() => handleChange(designColor, 'color')}
                onClick={(e) => e.stopPropagation()}
                className="checkbox bg-fuchsia-400"
              />{' '}
              <span className='label-text ml-2 text-xl'>{designColor}</span>
            </div>
          ))}
        </div>
      </List>
      <Divider />
      <List>
        <div className='ml-7'>
          <h3 className='text-[#323232]'><u>Categories</u></h3>
          {
            categoriesData.map(items => <div key={items} className='flex items-center'> <input
              type="checkbox"
              checked={category === items}
              onChange={() => handleChange(items, 'category')}
              className="checkbox bg-fuchsia-400"
            /> <span className='label-text ml-2 text-xl'>{items}</span> </div>)
          }
        </div>
      </List>
      <List>
        <div className='ml-7'>
          <h3 className='text-[#323232]'><u>Brands</u></h3>
          {categoriesBrand.map((productBrand) => (
            <div key={productBrand} className='flex items-center'>
              <input
                type="checkbox"
                checked={brand === productBrand}
                onChange={() => handleChange(productBrand, 'brand')}
                className="checkbox bg-[#cc4343c9]"
              />{' '}
              <span className='label-text ml-2 text-xl'>{productBrand}</span>
            </div>
          ))}
        </div>
      </List>
      <List>
     {
      product?"":   <div className='ml-7'>
      <h3 className='text-[#323232]'><u>Gender</u></h3>
      {['male', 'female', 'accesorices'].map((setgender) => (
        <div key={setgender} className='flex items-center'>
          <input
            type="checkbox"
            checked={gender === setgender }
            onChange={() => handleChange(setgender, 'gender')}
            className="checkbox bg-[#643cc2c9]"
          />{' '}
          <span className='label-text ml-2 text-xl'>{setgender}</span>
        </div>
      ))}
    </div>
     }
      </List>
      <List>
     {
      category?    <div className='ml-7'>
      <h3 className='text-[#323232]'><u>Size</u></h3>
      {newSize.map((size) => (
        <div key={size} className='flex items-center'>
          <input
            type="checkbox"
            checked={selectedSize === size}
            onChange={() => handleChange(size, "size")}
            className="checkbox bg-[#3ead9fc9]"
          />{' '}
          <span className='label-text ml-2 text-xl'>{size}</span>
        </div>
      ))}
    </div> : " "
     }
      </List>

    </Box>
  );

  return (
    <div>
      <FilterAltSharp />
      {['Filter'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
