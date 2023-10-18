import { useMediaQuery } from '@react-hook/media-query';
const useIsMobile = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
  return isMobile;

};

export default useIsMobile;