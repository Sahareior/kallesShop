import React, { useEffect } from "react";
import Footer from "./Components/Shared/Footer";
import Hero from "./Components/Page/Hero";
import Products from "./Components/Products/Products";
import Demo from "./Components/CardPic/Demo";
import Galary from "./Components/ImageGallary/Galary";
import Test from "./Components/expirement/Test";
import New from "./Components/NewArrival/New";
import Navbar from "./Components/Shared/Navbar/Navbar";

import Expriment from "./Components/Expriment/Expriment";
import Tabs from "./Components/Tabs/Tabs";
import Blog from "./Components/Blog/Blog";
import Dashboard from "./Components/Dashboard/Dashboard";
import AddItems from "./Components/Dashboard/AddItems/AddItems";
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
