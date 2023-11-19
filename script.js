// Items Database

import items from "./items.json";

// HTML Elements

export const shoppingCartIcon = document.querySelector(".shopping-cart-icon");

export const itemListPanel = document.querySelector(".item-list-panel");

export const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

// Shopping Cart Array

export let shoppingCart = JSON.parse(localStorage.getItem("shopping-cart")) || [];

// Update shopping cart icon invisibility

updateCartIcon()

export function updateCartIcon() {
    if (!shoppingCart.length) {
        shoppingCartIcon.classList.add("invisible")
    } else {
        shoppingCartIcon.classList.remove("invisible")
    }
    let indicator = shoppingCartIcon.querySelector(".cart-icon-indicator")
    indicator.innerText = shoppingCart.length
}

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
    shoppingCart.forEach((cartItem) => {
      if (cartItem.id == itemId) {
        ++cartItem.amount;
        cartItem.price = itemInfo.priceCents * cartItem.amount;
      }
    });
  } else {
    shoppingCart.push({
      id: itemId,
      name: itemInfo.name,
      amount: 1,
      price: itemInfo.priceCents,
      color: itemInfo.imageColor
    });
  }
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
  updateCartIcon()
  updateItemListPanel()
}

// Update item list panel

updateItemListPanel()

function updateItemListPanel() {
    itemListPanel.querySelector(".item-container").innerHTML = ""
    let totalPrice = 0
    shoppingCart.forEach(e => {
        let temp = document.getElementsByTagName("template")[0];
        let clon = temp.content.cloneNode(true);
        clon.querySelector("img").src = `https://dummyimage.com/210x130/${e.color}/${e.color}`
        clon.querySelector(".item-name").innerText = e.name
        clon.querySelector(".item-price").innerText = `$${(e.price / 100).toFixed(2)}`
        if (e.amount != 1 ){
            clon.querySelector(".item-number").innerText = `x${e.amount}`
        }
        clon.querySelector("button.remove-cart-item").dataset.itemId = e.id
        clon.querySelector("button.remove-cart-item").addEventListener("click", removeCartItem)
        itemListPanel.querySelector(".item-container").appendChild(clon)
        totalPrice += e.price
    })
    itemListPanel.querySelector(".total-price").innerText = `$${(totalPrice / 100).toFixed(2)}`
}

// Remove Cart Item Function 

function removeCartItem(e) {
    let removedId = e.target.dataset.itemId
    let removedItem = shoppingCart.find(e => e.id == removedId)
    if(removedItem.amount > 1) {
        shoppingCart.forEach(e => e.id == removedId && --e.amount)
    } else {
        shoppingCart = shoppingCart.filter(e => e.id != removedId)
    }
    shoppingCart.forEach((cartItem) => {
        if (cartItem.id == removedId) {
          let itemInfo = items.find(e => e.id == removedId)  
          cartItem.price = itemInfo.priceCents * cartItem.amount;
        }
    });
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
    updateCartIcon()
    updateItemListPanel()
}




// New Commit

  // Update itemListPanel variable up 1 level

