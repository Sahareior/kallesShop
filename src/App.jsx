import React, { useEffect } from "react";
import Footer from "./Components/Shared/Footer";
import Hero from "./Components/Page/Hero";
import Products from "./Components/Products/Products";
import New from "./Components/NewArrival/New";
import Navbar from "./Components/Shared/Navbar/Navbar";
import Blog from "./Components/Blog/Blog";
import NewTab from "./Components/Tabs/NewTabs";
import useCon from "./Components/Hooks/useCon";
import Navbar2 from "./Components/Shared/Navbar/Navbar2";


const App = () => {
  const {isDarkMode} = useCon()




  return (
    <div className="">
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
