import { useQuery } from '@tanstack/react-query';


const useData = () => {


    const { data=[], isLoading, refetch } = useQuery({
      queryKey: [],
      queryFn: async () => {
        const res = await fetch("https://kellas.vercel.app/products");
        return res.json();
      },
    });
    return ([data, isLoading,refetch] );
};

export default useData;

