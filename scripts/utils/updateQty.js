import { cart } from "../../data/cart-class.js";
import { renderCheckoutHeader } from "../checkout/checkoutHeader.js";

export function updateCartQty() {
  let cartQuantity = 0;

  cart.cartItems.forEach((item) => {
      cartQuantity += item.quantity; 
  });

  if (cartQuantity === 0) {
    cartQuantity = '';
  } else {
    cartQuantity;
  }

  document.querySelector('.js-cart-quantity')
  .innerHTML = `
      ${cartQuantity}
  `;
}

export function calculateCartQty() {
  let cartQuantity = 0;

  cart.cartItems.forEach((item) => {
      cartQuantity += item.quantity; 
  });

  renderCheckoutHeader(cartQuantity);
}