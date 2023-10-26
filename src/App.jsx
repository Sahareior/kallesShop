import React, { useEffect } from "react";
import Footer from "./Components/Shared/Footer";
import Hero from "./Components/Page/Hero";
import Products from "./Components/Products/Products";
import New from "./Components/NewArrival/New";
import Navbar from "./Components/Shared/Navbar/Navbar";
import Blog from "./Components/Blog/Blog";
import NewTab from "./Components/Tabs/NewTabs";
import useCon from "./Components/Hooks/useCon";


const App = () => {
  const {isDarkMode} = useCon()
  useEffect(() => {
    const desiredZoomLevel = 0.67;

    

    const handleBeforeUnload = () => {
      // Clear localStorage data here
      localStorage.clear();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className={`${isDarkMode? 'bg-black':''}`}>
      <Navbar />
      <Hero />
      <Products />
      <NewTab />
      <New />
      <Blog />
      <Footer />
    </div>
  );
};

export default App;
