import React, { useEffect, useState } from 'react';
import Title from '../../Shared/Cards/Title/Title';


const AddItems = () => {
    const [item,setItem] = useState([])
    useEffect(() => {
      fetch("https://hope-nine.vercel.app/items?sort=desc")
        .then((res) => res.json())
        .then((data) => 
          
            setItem(data)
        
           
        );
    }, []);
    console.log(item)
  return (
    <div>
          <Title text={"Add an item"} />
        <section className="w-[700px] h-[500px] p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
    <h1 className="text-xl font-bold text-white capitalize dark:text-white"></h1>
  
    <form>
        <div className="grid grid-cols-1 gap-6 mt-20 sm:grid-cols-2">
            <div>
                <label className="text-white dark:text-gray-200" htmlFor="username">Product Title</label>
                <input id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
            </div>
            <div>
                <label className="text-white dark:text-gray-200" htmlFor="username">Gender</label>
                <select className="appearance-none w-full py-1 px-2 bg-white" name="whatever" id="frm-whatever">
        <option value="">Please choose&hellip;</option>
      <option value="1">Male</option>
      <option value="2">Female</option>
      <option value="3">Others</option>
    </select>
            </div>

            <div>
                <label className="text-white dark:text-gray-200" htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>

        

        
            <div>
                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Color</label>
                <input id="color" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>
    
         
            <div>
                <label className="text-white dark:text-gray-200" for="passwordConfirmation">Date</label>
                <input id="date" type="date" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>
          
            <div>
                <label className="block text-sm font-medium text-white">
                Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {/* <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label for="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span className="">Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                    </label>
                    <p className="pl-1 text-white">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div> */}
                <input type="text" />
              </div>
            </div>
        </div>

        <div className="flex justify-center mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Upload</button>
        </div>
    </form>
</section>

    </div>
  );
};

export default AddItems;