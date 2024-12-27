// https://kellas.vercel.app
const addToDb = id => {
    console.log(id)
    let shoppingCart = getShoppingCart();
    // add quantity
    const quantity = shoppingCart[id];
    if  (!quantity) {
        shoppingCart[id] = 1;
    }
    else {
        const newQuantity = quantity + 1;
        shoppingCart[id] = newQuantity;
      
    }
    localStorage.setItem('shopping-cart1', JSON.stringify(shoppingCart));
    
}
const decrease = id => {
    let shoppingCart = getShoppingCart();
    // add quantity
    const quantity = shoppingCart[id];
    if  (!quantity) {
        shoppingCart[id] = 1;
    }
    else {
        const newQuantity = quantity - 1;
        shoppingCart[id] = newQuantity;
        console.log(newQuantity) 
    }
    localStorage.setItem('shopping-cart1', JSON.stringify(shoppingCart));
    
}

const removeFromDb = id => {
    const shoppingCart = getShoppingCart();
    if (id in shoppingCart) {
        delete shoppingCart[id];
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
    }
}

const getShoppingCart = () => {
    let shoppingCart = {};

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('shopping-cart1');
    if (storedCart) {
        shoppingCart = JSON.parse(storedCart);
        
    }
    return shoppingCart;
}

function deleteShoppingCart(itemId) {
    let shoppingCart = getShoppingCart();
  
    if (itemId in shoppingCart) {
      delete shoppingCart[itemId];
  
      // Convert the modified object back to a string and update local storage
      localStorage.setItem('shopping-cart1', JSON.stringify(shoppingCart));
    }
  }
  
  

export {
    addToDb,
    removeFromDb,
    getShoppingCart,
    deleteShoppingCart,
    decrease
}
