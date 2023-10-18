import React from 'react';

const Banner = ({img}) => {

    return (
        <div>
        <div className="w-full h-[800px]" style={{ backgroundImage: `url(${img})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>


            </div>
        </div>
    );
};

export default Banner;