import React, { useContext } from 'react';
import { AuthContext } from '../Provider/MyProvider';

const useCon = () => {
    const context = useContext(AuthContext) 
    return context
     
  
};

export default useCon;