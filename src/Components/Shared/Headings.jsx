import React from 'react';

const Headings = ({ text }) => {
  return (
    <div>
      <h1
        className="text-center font3 font-bold my-7 text-[24px]"
       
      >
        {text}
        <div className='w-52 mx-auto mt-1 bg-slate-500 h-1'></div>
      </h1>
    </div>
  );
};

export default Headings;
