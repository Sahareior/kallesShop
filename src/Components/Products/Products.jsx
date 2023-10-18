import React, { useEffect, useState } from "react";
import "./Products.css";
import Test from "../expirement/Test";
import { Link } from "react-router-dom";
import useData from "../Hooks/useData";

function Promo({ text, cta, color, src }) {
  return (
    <div className="promo" style={{ "--overlay-color": color }}>
      <div className="image-wrapper">
        <img src={src} alt="" />
      </div>
      <h2 className="title" data-cta={cta}>
        {text}
      </h2>
    </div>
  );
}

function Products() {
  
  const [data] = useData()



  const shirts = data.filter(data => data.category === 'shirts')
  const jeans = data.filter(data => data.category === 'jeans')
  const women = data.filter(data => data.category === 'tops')
  const others = data.filter(data => data.gender === 'accesorices')



  return (
    <div className="md:flex flex h-[1150px] justify-around  bg-black">
      <div className="h-[900px] ml-9 mt-7">
        <Link to='/products' state={{data:shirts, shirts:"shirts"}}>
          <Promo
            text="Shirts"
            cta="Get out there →"
            color="hotpink"
            src="https://img.freepik.com/free-photo/black-shirt-with-word-ultra-it_1340-37775.jpg?size=626&ext=jpg"
          />
        </Link>
        <Link to="/products" state={{ data:jeans,  shirts:"jeans" }}>
          {" "}
          <Promo
            text="Jeans"
            cta="Find yours →"
            color="yellow"
            src="https://img.freepik.com/free-photo/jeans-detail-dressed-by-model_150588-28.jpg?size=626&ext=jpg"
          />
        </Link>
        <Link to="/products" state={{ data: women, shirts:'tops' }}>
          <Promo
            text="Tops"
            cta="Visit the collections →"
            color="dodgerblue"
            src="https://img.freepik.com/free-photo/fashionable-portrait-smiling-elegant-brunette-girl-sunglasses_273443-1260.jpg?size=626&ext=jpg"
          />
        </Link>
        <Link to="/products" state={{ data: others, type:'accesorices' }}>
          <Promo
            text="Accessories"
            cta="Take a look →"
            color="darkgreen"
            src="https://img.freepik.com/free-photo/fashion-objects-yellow_155003-5160.jpg?size=626&ext=jpg"
          />
        </Link>
      </div>
      <div className="md:flex hidden md:visible justify-center items-center">
        <Test></Test>
      </div>
    </div>
  );
}

export default Products;
// .......................


// import React from "react";
// import "./Products.css";
// import Test from "../expirement/Test";
// import { Link } from "react-router-dom";

// function Promo({ text, cta, color, src }) {
//   return (
//     <div className="promo" style={{ "--overlay-color": color }}>
//       <div className="image-wrapper">
//         <img src={src} alt="" />
//       </div>
//       <h2 className="title" data-cta={cta}>
//         {text}
//       </h2>
//     </div>
//   );
// }

// function Products() {
//   return (
//     <div className="flex h-[1100px] justify-around pt-6 mt-10 bg-black">
//       <div className="h-[900px] mt-1">
//         <Link to="/products" state={{ type: "shirts" }}>
//           <Promo
//             text="Shirts"
//             cta="Get out there →"
//             color="hotpink"
//             src="https://img.freepik.com/free-photo/black-shirt-with-word-ultra-it_1340-37775.jpg?size=626&ext=jpg"
//           />
//         </Link>
//         <Link to="/products" state={{ type: "jeans" }}>
//           {" "}
//           <Promo
//             text="Jeans"
//             cta="Find yours →"
//             color="yellow"
//             src="https://img.freepik.com/free-photo/jeans-detail-dressed-by-model_150588-28.jpg?size=626&ext=jpg"
//           />
//         </Link>
//         <Link to="/products" state={{ type: "women" }}>
//           <Promo
//             text="Women's Choice"
//             cta="Grab a board →"
//             color="dodgerblue"
//             src="https://img.freepik.com/free-photo/stylish-woman-summer-outfit-isolated-posing-fashion-trend-isolated_285396-470.jpg?size=626&ext=jpg"
//           />
//         </Link>
//         <Link to="/products" state={{ type: "others" }}>
//           <Promo
//             text="Accessories"
//             cta="Take a walk →"
//             color="darkgreen"
//             src="https://img.freepik.com/free-photo/fashion-objects-yellow_155003-5160.jpg?size=626&ext=jpg"
//           />
//         </Link>
//       </div>
//       <div className="mt-24">
//         <Test></Test>
//       </div>
//     </div>
//   );
// }

// export default Products;
