import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Headings from '../Shared/Headings';
import { Filter } from '../Page/Filter/Filter';
import Card from '../Shared/Cards/Card';
import useCon from '../Hooks/useCon';
import { addToDb } from '../Hooks/useTools';
import FilterSystem from '../Blog/FilterSystem';
import useIsMobile from '../Hooks/useIsMobile';
import MobileView from '../Products Cat/MobileView';


const Allproducts = () => {
  const location = useLocation();
  const { setCartPrice, cartPrice,isDarkMode } = useCon();
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [visibleDataCount, setVisibleDataCount] = useState(8); 
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading,setIsloading] = React.useState([])
  const [receivedData, setReceivedData] = useState(location?.state?.data);
  const mobile = useIsMobile()


  
  const filter = location?.state?.type
  const shirts = location?.state?.shirts
  const product = location?.state?.product

console.log(product)

  useEffect(() => {
    if (isLoading?.length > 0) {
      setReceivedData(isLoading);
    }
  }, [isLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to top on component mount
}, []);
 
console.log(receivedData)
const uniqueCategories = new Set();
const allColors = new Set();
const brands = new Set()
const size = new Set()

// Loop through receivedData and add categories to the Set
receivedData?.forEach(item => {
  uniqueCategories.add(item.category);
});

receivedData?.forEach(items => {
 if(items.color !== undefined){
  allColors.add(items.color)
 }
})

receivedData?.forEach(items => {
 if(items.brand !== undefined && items.brand !== "{items}"){
  brands.add(items.brand)
 }
})
receivedData?.forEach(items => {
  size.add(items.size)
})

// Convert Set to an array if needed
const categoriesData = Array.from(uniqueCategories);
const categoriesType = Array.from(uniqueCategories);
const categoriesColors = Array.from(allColors)
const categoriesBrand = Array.from(brands)
const categoriesSize = Array.from(size)


const filteredSize = new Set()

categoriesSize.forEach(item => {
  if(item !== undefined){
    for(let i= 0; i<item.length; i++){
     
      filteredSize.add(item[i])
    }
  }
})
const newSize = Array.from(filteredSize)
const items = {
  filteredSize,
  categoriesBrand,
  categoriesColors,
  newSize,
  categoriesType,
  product
}
  useEffect(() => {
    const formattedInput = input.trim().replace(/\s/g, "");

    if (formattedInput === "") {
      setResult(data);
    } else {
      const find = data.filter((d) =>
        d.title.toLowerCase().replace(/\s/g, "").includes(formattedInput.toLowerCase())
      );
      setResult(find);
    }
  }, [input, data]);

  useEffect(() => {
    const receivedData = location?.state?.data;

    if (filterData?.length > 0) {
      setData(filterData);
    } else if (receivedData?.length>0) {
      setData(receivedData);
    } else if (result?.length > 0) {
      setData(result);
    }
  }, [location?.state?.data, filterData, result]);

  const addToCart = (data) => {
    setCartPrice([...cartPrice, data]);
    addToDb(data._id);
  };

  const loadMore = () => {
    // Increase the number of visible data items by 6
    setVisibleDataCount((prevCount) => prevCount + 6);
  };




  return (
    <div className='mx-auto  mt-5'>
      <Headings text={"Choose Your Products"} />
      <div className='flex gap-16 justify-around flex-row-reverse justify-items-center'>
        <input type="text" placeholder="Type here" onChange={(e) => setInput(e.target.value)} name='search' className={`${isDarkMode? 'text-white text-xl' : 'bg-slate-300'} input input-bordered input-error w-44 mr-3 md:w-72 md:max-w-xs`} />
        {/* <Filter categoriesData={categoriesData} setFilterData={setFilterData} /> */}
        <FilterSystem filter={filter} setIsloading={setIsloading} type={shirts} items={items} categoriesData={categoriesData} setFilterData={setFilterData} ></FilterSystem>
      </div>
      <div className={`${isDarkMode ? 'bg-black' : ''} flex justify-center flex-wrap mt-4 ${result.length > 3 ? 'justify-start' : 'justify-center'} gap-x-5`}>
  {isLoading.length === 0 ? (
    <h3 className='text-center'>No items Found!!</h3>
  ) : (
    mobile
      ? <MobileView addToCart={addToCart} data={result} />
      : result.slice(0, visibleDataCount).map((info) => (
          <Card
            key={info._id}
            addToCart={addToCart}
            id={info._id}
            info={info}
            img={info.img}
            img2={info.img2}
            title={info.title}
          />
        ))
  )}
</div>


 <div>
 {visibleDataCount < result.length && (
        <button onClick={loadMore} className='btn md:btn-neutral mx-auto mt-14 mb-6 btn-outline '>
          Load More
        </button>
      )}
 </div>
    </div>
  );
};

export default Allproducts;
