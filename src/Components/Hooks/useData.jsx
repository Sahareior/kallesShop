import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

const useData = () => {


    const { data=[], isLoading, refetch } = useQuery({
      queryKey: [],
      queryFn: async () => {
        const res = await fetch("http://localhost:5000/products");
        return res.json();
      },
    });
    return ([data, isLoading,refetch] );
};

export default useData;

