import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

const useData = () => {


    const { data=[], isLoading, refetch } = useQuery({
      queryKey: [],
      queryFn: async () => {
        const res = await fetch("https://kallesshopserver-production.up.railway.app/products");
        return res.json();
      },
    });
    return ([data, isLoading,refetch] );
};

export default useData;

