import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css'


import { Drawer, ButtonToolbar, Button, IconButton } from 'rsuite';
import { FilterAltSharp } from '@mui/icons-material';
import useIsMobile from '../../Hooks/useIsMobile';


export const Filter = ({setFilterData,categoriesData}) => {
  const mobile = useIsMobile()
  let display ;
  if(mobile){
    display = 'sm'
  }
  else{
    display = 'xs'
  }
  console.log(display)
  const [size, setSize] = React.useState(display);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [selectedSize, setSelectedSize] = React.useState('')
  const [color,setColor] = useState('')
  const [brand,setBrand] = useState('')
  const [category,setCategory] = useState('')
  const [gender, setGender] = useState('')

  const handleChange = (value, type) => {
    if (type === 'color') {
      setColor(color === value ? '' : value); // Toggle color filter
    } else if (type === 'size') {
      setSelectedSize(selectedSize === value ? '' : value); // Toggle size filter
    } else if (type === 'brand') {
      setBrand(brand === value ? '' : value); // Toggle brand filter
    }
    else if(type === 'category'){
      setCategory( category === value ? '': value)
    }
    else if(type === 'gender'){
      setGender( gender === value ? '': value)
    }
  };

  useEffect(() => {
    // Update the URL whenever any filter changes
    const queryParams = [];
    if (selectedSize) {
      queryParams.push(`size=${selectedSize}`);
    }
    if (color) {
      queryParams.push(`color=${color}`);
    }
    if (brand) {
      queryParams.push(`brand=${brand}`);
    }
    if(category) {
      queryParams.push(`category=${category}`)
    }
    if(gender) {
      queryParams.push(`gender=${gender}`)
    }
    
    const queryString = queryParams.join('&');
    const url = `https://kellas.vercel.app/allproducts?${queryString}`;
    console.log(url);
     fetch(url)
    .then(res=> res.json())
    .then(result => setFilterData(result))
      
  
    // Now you can fetch the data using the updated URL
  }, [selectedSize, color, brand,setFilterData,category,gender]);


  const handleOpen = key => {
    setOpen(true);
    setPlacement(key);
  };
  console.log(selectedSize,brand)

  return (
    <>

      <hr />
      <ButtonToolbar>
        <IconButton  onClick={() => handleOpen('left')}>
        <FilterAltSharp />
        </IconButton>
      </ButtonToolbar>

      <Drawer size={size} placement={placement} open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
       
        </Drawer.Header>
        <Drawer.Body>
     <div className='mr-10 with-left-border'>
         <div className='left-border-content'>
         <div className='my-4'>
         <h3  className='text-[#323232]'><u>Availability</u></h3>
         <div className="">
  <label className="flex">
    <span className="label-text text-xl">In Stock</span> 
    <input type="checkbox" checked="checked" className="checkbox ml-2 checkbox-primary" />
  </label>
</div>

         </div>
         
         <div>
         <h3 className='text-[#323232]'><u>Categories</u></h3>
            {
              categoriesData.map(items=>  <div   key={items} className='flex items-center gap-5'> <input
              
                  type="checkbox"
                  checked ={category === items}
                 
                onChange={()=> handleChange(items, 'category')}
                  className="checkbox "
                /> <h4>{items}</h4> </div>)
            }
         </div>
         
         <div className='my-4'>
         <h3 className='text-[#323232]'><u>Brands</u></h3>
         {['Levis', 'Gucci', 'Raymond','Jordan'].map((productBrand) => (
            <div key={productBrand} className='flex items-center gap-5'>
              <input
                type="checkbox"
                checked={brand === productBrand}
                onChange={() => handleChange(productBrand,'brand')}
                className="checkbox"
              />{' '}
              <h4>{productBrand}</h4>
            </div>
          ))}
         </div>
         <div className='my-4'>
         <h3 className='text-[#323232]'><u>Gender</u></h3>
         {['male', 'female','others'].map((setgender) => (
            <div key={setgender} className='flex items-center gap-5'>
              <input
                type="checkbox"
                checked={gender === setgender}
                onChange={() => handleChange(setgender,'gender')}
                className="checkbox"
              />{' '}
              <h4>{setgender}</h4>
            </div>
          ))}
         </div>
         
         <div className='my-4'>
         <h3 className='text-[#323232]'><u>Colors</u></h3>
         {['red', 'black', 'yellow','green'].map((designColor) => (
            <div key={designColor} className='flex items-center gap-5'>
              <input
                type="checkbox"
                checked={color === designColor}
                onChange={() => handleChange(designColor,'color')}
                className="checkbox"
              />{' '}
              <h4>{designColor}</h4>
            </div>
          ))}
         </div>
        
         <div className='my-4'>
         <h3 className='text-[#323232]'><u>Size</u></h3>
          {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
            <div key={size} className='flex items-center gap-5'>
              <input
                type="checkbox"
                checked={selectedSize === size}
                onChange={() => handleChange(size,"size")}
                className="checkbox"
              />{' '}
              <h4>{size}</h4>
            </div>
          ))}
        </div>
         </div>
     </div>
        </Drawer.Body>
      </Drawer>
    </>
  );
};
