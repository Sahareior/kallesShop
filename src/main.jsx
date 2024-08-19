import React from "react";
import ReactDOM from "react-dom/client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailsL from "./Components/Layout/Details.L.jsx";
import Details from "./Components/ProductDetails/Details.jsx";
import Allproducts from "./Components/AllProduct/Allproducts.jsx";
import { MyProvider } from "./Components/Provider/MyProvider.jsx";
import Admin from "./Components/AdminPanel/Admin.jsx";
import AddProduct from "./Components/AdminPanel/AddProduct.jsx";
import AllProducts from "./Components/AdminPanel/AllProducts.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from 'react-redux';
import Orders from "./Components/AdminPanel/Orders.jsx";
import Checkout from "./Components/Page/Filter/Checkout/Checkout.jsx";
import Confirmpage from "./Components/Page/Filter/Checkout/Confirmpage.jsx";

import Mcart from "./Components/CartItems/mobile/Mcart.jsx";
import PcLogin from './Components/Authentication/pcLogin/PcLogin.jsx'

import Login from './Components/Authentication/Login/Login.jsx'
import PrivateRoute from "./Components/Routes/PrivateRoute.jsx";
import Signin from "./Components/Authentication/pcSignIn/Signin.jsx";
import { store } from "./ReactRedux/store.js";
import Help from "./Components/AllProduct/Help/Help.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
 
  {
    path: "/",
    element: <DetailsL></DetailsL>,
    children: [
      {
        path: "details/:id",
        element: <Details />,
        errorElement: <div>Oops! Something went wrong while loading details.</div>,
        children: [
          {
            path: "products/details/:id",
            element: <Details />,
            errorElement: <div>Oops! Something went wrong while loading details.</div>
          }
        ]
        
      },
      {
        path: "mobile/details/:id",
        element: <Details />,
        errorElement: <div>Oops! Something went wrong while loading details.</div>
      },
      {
        path: "products/details/:id",
        element: <Details />,
        errorElement: <div>Oops! Something went wrong while loading details.</div>
      },
      {
        path: "products",
        element: <Allproducts></Allproducts>,
      },
     
      {
        path: 'login',
        element: <PcLogin></PcLogin>
      },
      {
        path: 'reg',
        element: <Signin></Signin>
      },
      {
        path: 'mobilelogin',
        element: <Login></Login>
      },
      {
        path: "checkout",
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute>,
      },
      {
        path: "mcart",
        element: <Mcart></Mcart>,
      },
      {
        path:"payments/success",
        element: <Confirmpage></Confirmpage>
      },
     
    ],
  },
  {
    path: "mcart",
    element: <Mcart></Mcart>,
  },
  {
    path: "admin",
    element: <Admin></Admin>,
    children:[
      {
        path: 'add',
        element:<AddProduct></AddProduct>
      },
      {
        path: "products",
        element: <AllProducts></AllProducts>
      },
      {
        path: "orders",
        element: <Orders></Orders>
      }
    ]
  },

 

]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyProvider>
     
        <div className="md:px-10 mx-auto  overflow-hidden">
        <QueryClientProvider client={queryClient}>
        <Provider store={store}>
        <RouterProvider router={router} />
        </Provider>
    </QueryClientProvider>
        
        </div>
 
    </MyProvider>
  </React.StrictMode>
);
// document.body.style.zoom = '60%';