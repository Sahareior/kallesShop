import { useEffect, useState } from "react";
import Title from "../Shared/Cards/Title/Title";
import { useAddItemMutation } from "../../ReactRedux/apiSlice";
import useCon from "../Hooks/useCon";
import { redirect, useNavigate } from "react-router-dom";
import Headings from "../Shared/Headings";

const AddProduct = () => {
  const navigate = useNavigate()
  const [sgender, setSgender] = useState("Male");
  const [scategory, setScategory] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [addItem] = useAddItemMutation();
  const {user} = useCon()

  useEffect(() => {
    if (!user?.email) {
      alert("Please sign in to continue");
      setTimeout(() => {
        navigate("/");
      }, 3000); // 3 seconds delay
    }
  }, [user, navigate]);
  const availableSizes = ["xs", "sm", "md", "lg", "xl"];
  

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

  const handleChange = (e) => setSgender(e.target.value);
  const handleCategory = (e) => setScategory(e.target.value);
  const handleBrand = (e) => setBrand(e.target.value);
  const handleColor = (e) => setColor(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading

    const data = {
      id: new Date().getTime().toString(),
      gender: sgender.toLowerCase(),
      title: e.target.title.value,
      category: scategory.toLowerCase(),
      img: e.target.img.value,
      img2: e.target.img2.value,
      color: e.target.color.value,
      email: e.target.email.value,
      Psize: sgender === "Accessories" ? [] : selectedSizes, // Disable sizes for accessories
      price: parseFloat(e.target.price.value),
      PBrand: brand || e.target.brandName.value,
    };

    try {
      await addItem(data).unwrap();
      alert("Item added successfully");
      e.target.reset(); // Clear form after submission
      setSelectedSizes([]); // Clear sizes
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add item");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleSizeCheckboxChange = (e) => {
    const selectedSize = e.target.value;
    setSelectedSizes(selectedSizes.includes(selectedSize)
      ? selectedSizes.filter((size) => size !== selectedSize)
      : [...selectedSizes, selectedSize]);
  };

  const loadCategories = () => {
    if (sgender === "Male") return maleClothing;
    if (sgender === "Female") return womenClothing;
    if (sgender === "Accessories") return shopAccessories;
    return [];
  };

  useEffect(() => {
    setScategory(loadCategories()[0]);
  }, [sgender]);

  return (
    <div className="mb-10 pb-20">
      <div className="mt-6">
       <Headings text={"Add a Product"} />
      </div>
      <section className="w-full p-6 mx-auto bg-slate-600 rounded-md shadow-md dark:bg-gray-800 mt-10">
        <form onSubmit={handleSubmit}>
          <div className="md:grid grid-cols-3 gap-6 mt-10 sm:grid-cols-3">
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="title">
                Product Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="gender">
                For
              </label>
              <select
                onChange={handleChange}
                className="appearance-none w-full py-1 px-2 bg-white"
                id="gender"
                value={sgender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="category">
                Category
              </label>
              <select
                onChange={handleCategory}
                className="appearance-none w-full py-1 px-2 bg-white"
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
              <label className="text-white dark:text-gray-200" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="brandName">
                Brand
              </label>
              <select
                onChange={handleBrand}
                id="selectedBrand"
                className="block w-full px-9 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option value="">Reset</option>
                {clothingBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              {!brand && (
                <input
                  type="text"
                  id="brandName"
                  name="brandName"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              )}
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Available Sizes
              </label>
              <div className="flex justify-center border bottom-2 border-fuchsia-900 p-4 gap-3 bg-slate-900 flex-wrap mt-2">
                {availableSizes.map((size) => (
                  <label
                    key={size}
                    className={`border bottom-2 border-emerald-400 px-1.5 ${sgender === "Accessories" ? "opacity-50" : ""}`}
                  >
                    <input
                      type="checkbox"
                      value={size}
                      checked={selectedSizes.includes(size)}
                      onChange={handleSizeCheckboxChange}
                      disabled={sgender === "Accessories"}
                      className="form-checkbox w-14"
                    />
                    <span className="text-gray-300 text-xl">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="price">
                Price
              </label>
              <input
                id="price"
                type="number"
                name="price"
                placeholder="$$"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="color">
                Color
              </label>
              <select
                name="color"
                onChange={handleColor}
                id="color"
                className="block w-full px-9 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option value="">Select a Color</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Navy Blue">Navy Blue</option>
                {/* More colors */}
              </select>
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Main Image
              </label>
              <input
                name="img"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Second Image
              </label>
              <input
                name="img2"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          </div>
          {loading ? (
            <div className="text-white mt-4">Uploading...</div>
          ) : (
            <button className="text-white bg-indigo-700 w-full mt-5 p-2 rounded hover:bg-indigo-800 transition duration-300">
              Submit
            </button>
          )}
        </form>
      </section>
    </div>
  );
};

export default AddProduct;
