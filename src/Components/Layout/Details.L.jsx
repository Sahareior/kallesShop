import React from 'react';

import Footer from '../Shared/Footer';
import Navbar from '../Shared/Navbar/Navbar';
import Details from '../ProductDetails/Details';
import { Outlet } from 'react-router-dom';

const DetailsL = () => {
    return (
        <div>
         <Navbar></Navbar>
     <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default DetailsL;