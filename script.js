// + Using "invisible" class name to hide elements

// + "Shopping Cart" Icon

//     + Hidden if empty

//     + Indicator showing how many items are in cart

//     + Click Event: show all items in cart

// + Cart Item: X Click Event

//     + Remove item from cart

// + "Add To Cart" Button: Click Event

//      + If item is already in array

//              + Update item amount, price and total price

//      + Else

//              + Create item object

//              + Push to cart array

//              + Update array on local browser

//              + Run updateItemListPanel()

// Items Database

import items from "./items.json";

// HTML Elements

const shoppingCartIcon = document.querySelector(".shopping-cart-icon");

const itemListPanel = document.querySelector(".item-list-panel");

const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

// Shopping Cart Array

const shoppingCart = JSON.parse(localStorage.getItem("shopping-cart")) || [];

// Click Event on "Shopping Cart Icon" to open "Item List Panel"

shoppingCartIcon.addEventListener("click", (e) => {
  itemListPanel.classList.toggle("invisible");
});

// Click Event on "Add To Cart" button

addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", addToCart);
});

function addToCart(e) {
  let itemId = e.target.dataset.itemId;
  let itemInfo = items.find((item) => item.id == itemId);
  const inList = shoppingCart.find((cartItem) => cartItem.id == itemId);
  if (inList) {
    shoppingCart.forEach(cartItem => {
        if(cartItem.id == itemId) {
            ++cartItem.amount
            // cartItem.price = parseFloat(itemInfo.price) * parseFloat(cartItem.amount)
        }
    });
  } else {
    shoppingCart.push({
      id: itemId,
      name: itemInfo.name,
      amount: 1,
      price: itemInfo.priceCents 
    });
  }
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart))
  console.log(shoppingCart)
}
