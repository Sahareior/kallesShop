import React from 'react';

const Headings = ({ text }) => {
  return (
    <div>
      <h1
        className="text-center  font-bold my-7 text-[24px]"
        style={{
          fontFamily: 'Spartan',
          fontSize: '24px',
          fontStyle: 'normal',
          fontVariantCaps: 'normal',
          fontVariantEastAsian: 'normal',
          fontVariantLigatures: 'normal',
          fontVariantNumeric: 'normal',
          fontWeight: 600,
        }}
      >
        {text}
      </h1>
    </div>
  );
};

export default Headings;
