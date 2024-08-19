import { useEffect, useState } from "react";
import Title from "../Shared/Cards/Title/Title";
import { useAddItemMutation} from "../../ReactRedux/apiSlice";

const AddProduct = () => {
  const [sgender, setSgender] = useState("Male");
  const [scategory, setScategory] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
 console.log(brand)
  const [addItem] = useAddItemMutation();

  const availableSizes = ["xs", "sm", "md", "lg", "xl"];
  const [selectedSizes, setSelectedSizes] = useState([]);

  const womenClothing = [
    "Dresses",
    "Tops",
    "Blouses",
    "Skirts",
    "Pants",
    "Jeans",
    "Shorts",
    "Jumpsuits",
    "Rompers",
    "Leggings",
    "Sweaters",
    "Cardigans",
    "Hoodies",
    "Jackets",
    "Coats",
    "Blazers",
    "Suits",
    "Activewear",
    "Sportswear",
    "Swimwear",
    "Sleepwear",
    "Lingerie",
    "Underwear",
    "Socks",
    "Accessories",
    "Handbags",
    "Purses",
    "Scarves",
    "Shawls",
    "Jewelry",
    "Hats",
    "Caps",
    "Belts",
    "Sunglasses",
    "Gloves",
    "Mittens",
    "Wallets",
    "Cardholders",
    "Hair Accessories",
    "Ties",
    "Bowties",
    "Umbrellas",
    "Footwear Accessories",
    "Socks and Hosiery",
    "Watches",
    "Suspenders",
    "Ties and Scarf Clips",
    "Eyeglass Frames",
    "Hand Fans",
    "Tie Pins and Cufflinks",
    "Wristbands",
    "Bracelets",
    "Footwear",
    "Flats",
    "Heels",
    "Boots",
    "Sandals",
    "Sneakers",
    "Traditional Wear",
    "Spring/Summer Collection",
    "Fall/Winter Collection"
  ];
  
  const maleClothing = [
    "T-Shirts",
    "Shirts",
    "Jeans",
    "Pants",
    "Shorts",
    "Suits",
    "Jackets",
    "Coats",
    "Hoodies",
    "Sweaters",
    "Socks",
    "Underwear",
    "Activewear",
    "Swimwear",
    "Sleepwear",
    "Accessories",
    "Footwear",
    "Outerwear",
    "Sportswear",
    "Traditional Wear",
    "Tops",
    "Dresses",
    "Bottoms",
    "Outerwear",

    "Swimwear",
    "Footwear",
    "Workwear",
    "Spring/Summer Collection",
    "Fall/Winter Collection",
  ];

  const clothingBrands = [
    'Nike',
    'Adidas',
    'Levis',
    'H&M',
    'Zara',
    'GAP',
    'Puma',
    'Tommy Hilfiger',
    'Calvin Klein',
    'Ralph Lauren',
    'Under Armour',
    'Forever 21',
    'Burberry',
    'Gucci',
    'Versace',
    'Diesel',
    'Lacoste',
    'Balenciaga',
    'Prada',
    'Fendi'
  ];
  
  const shopAccessories = [
    'Handbags and Purses',
    'Scarves and Shawls',
    'Jewelry',
    'Hats and Caps',
    'Belts',
    'Sunglasses',
    'Gloves and Mittens',
    'Wallets and Cardholders',
    'Hair Accessories',
    'Ties and Bowties',
    'Umbrellas',
    'Footwear Accessories',
    'Socks and Hosiery',
    'Watches',
    'Suspenders',
    'Ties and Scarf Clips',
    'Eyeglass Frames',
    'Hand Fans',
    'Tie Pins and Cufflinks',
    'Watch',
    'Wristbands and Bracelets'

  ];
  // Now the clothingBrands array contains a list of clothing brand names.
  
  // Now the maleClothing array contains all the clothing items.

  const handleChange = (e) => {
    setSgender(e.target.value);
  };
  const handleCategory = (e) => {
    setScategory(e.target.value);
  };

  const handleBrand = (e) => {
    setBrand(e.target.value);

  };
  const handleColor = (e) => {
    setColor(e.target.value);
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  const currentdate = new Date()
  const id = currentdate.getTime().toString()
  const gender = sgender.toLowerCase();
  const title = e.target.title.value;
  const category = scategory.toLowerCase();
  const img = e.target.img.value;
  const img2 = e.target.img2.value;
  const color = e.target.color.value;
  const date = e.target.date.value;
  const email = e.target.email.value;
  // const zoomImage = e.target.zoom.value;
  const price = parseFloat(e.target.price.value);
  const brandName = e.target.brandName.value;

  let data;

  if (brand.length > 0) {
    data = {
      title,
      gender,
      img,
      id,
      img2,
      color,
      date,
      email,
      Psize: selectedSizes,
      category,
      price,
      PBrand: brand,
    };
  } else {
    data = {
      title,
      gender,
      img,
      id,
      img2,
      color,
      date,
      email,
      Psize: selectedSizes,
      category,
      price,
      PBrand: brandName,
    };
  }

  console.log('Data to be submitted:', data); // Log data here
  
  try {
    const res = await addItem(data).unwrap();
    console.log('Response:', res); // Log response here
    alert("Item added successfully");
  } catch (error) {
    console.error('Error:', error); // Log any errors here
    alert("Failed to add item");
  }
};

  const handleSizeCheckboxChange = (e) => {
    const selectedSize = e.target.value;
    if (selectedSizes.includes(selectedSize)) {
      setSelectedSizes(selectedSizes.filter((size) => size !== selectedSize));
    } else {
      setSelectedSizes([...selectedSizes, selectedSize]);
    }
  };



  const loadCategories = () => {
    if (sgender === "Male") {
      return maleClothing;
    } else if (sgender === "Female") {
      return womenClothing;
    } else if (sgender === "Accessories") {
      return shopAccessories;
    }
    return [];
  };
  
  useEffect(() => {
    setScategory(loadCategories()[0]);
  }, [sgender]);
  return (
    <div className="mb-10 pb-20">
      <div className="mt-6">
        <Title text={"Add an Item"} />
      </div>
      <section className="w-full  p-6 mx-auto bg-slate-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white"></h1>

        <form onSubmit={handleSubmit}>
          <div className="md:grid grid-cols-3 gap-6 mt-10 sm:grid-cols-3">
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="username"
              >
                Product Title
              </label>
              <input
                id="username"
                type="text"
                name="title"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="username"
              >
                For
              </label>
              <select
                onChange={handleChange}
                className="appearance-none w-full py-1 px-2 bg-white"
                name="whatever"
                id="frm-whatever"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Accessories">Accessories</option>
               
              </select>
            </div>
            <div>
  <label className="text-white dark:text-gray-200" htmlFor="username">
    Category
  </label>
  <select
  onChange={handleCategory}
  className="appearance-none w-full py-1 px-2 bg-white"
  name="category"
  id="category"
  value={scategory}
>
  {loadCategories().map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ))}
</select>

</div>


            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
                id="emailAddress"
                type="text"
                name="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="brandName"
              >
                Brand
              </label>
              <div className="relative  h-28">
                <select
                  name="selectedBrand"
                  onChange={handleBrand}
                  id="selectedBrand"
                  className="block w-full px-9 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  {/* <option value="" disabled selected>Select a brand</option> */}
                  <option value="">Reset</option>
                  {
                    clothingBrands.map(items => <option key={items} value={items}>{items}</option>)
                  }
                  {/* Add more options here */}
                </select>
                <input
                  type="text"
                  id="brandInput"
                  name="brandName"
                  className={`${
                    brand.length > 0 ? "hidden" : ""
                  } w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring`}
                />
              </div>
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Available Sizes
              </label>
              <div className="flex justify-center border bottom-2 border-fuchsia-900 p-4 gap-3 bg-slate-900 flex-wrap mt-2">
                {availableSizes.map((size) => (
                  <label
                    key={size}
                    className=" border bottom-2 border-emerald-400   px-1.5"
                  >
                    <input
                      type="checkbox"
                      value={size}
                      checked={selectedSizes.includes(size)}
                      onChange={handleSizeCheckboxChange}
                      className="form-checkbox w-14"
                    />
                    <span className="text-gray-300 text-xl ">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="emailAddress"
              >
                Price
              </label>
              <input
                id="emailAddress"
                type="number"
                name="price"
                placeholder="$$"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="passwordConfirmation"
              >
                Color
              </label>
              <select
                  name="color"
                  onChange={handleColor}
                  id="selectedBrand"
                  className="block w-full px-9 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  {/* <option value="" disabled selected>Select a brand</option> */}
                  
                  <option value="" > Select a Color</option>
                  
  <option value="Black">Black</option>
  <option value="White">White</option>
  <option value="Navy Blue">Navy Blue</option>
  <option value="Gray">Gray</option>
  <option value="Beige/Khaki">Beige/Khaki</option>
  <option value="Olive Green">Olive Green</option>
  <option value="Burgundy">Burgundy</option>
  <option value="Nude/Pastel Colors">Nude/Pastel Colors</option>
  <option value="Charcoal">Charcoal</option>
  <option value="Denim Blue">Denim Blue</option>
  <option value="Red">Red</option>
  <option value="Caramel/Brown">Caramel/Brown</option>
  <option value="Teal">Teal</option>


                  {/* Add more options here */}
                </select>
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
         
              >
                Date
              </label>
              <input
                id="date"
                type="date"
                name="date"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Main Image
              </label>
              <div className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                <input name="img" type="text" />
              </div>
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Slideing Image
              </label>
              <div className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                <input name="img2" type="text" />
              </div>
            </div>
            {/* <div>
              <label className="text-white dark:text-gray-200">
                Zoom-Image
              </label>
              <div className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                <input name="zoom" type="text" />
              </div>
            </div> */}
          </div>

          <div className="flex justify-center mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              Upload
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddProduct;

{
  /* <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label for="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span className="">Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                  </label>
                  <p className="pl-1 text-white">or drag and drop</p>
                </div>
                <p className="text-xs text-white">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div> */
}

