import { cart } from "../../data/cart.js";
import { renderCheckoutHeader } from "../checkout/checkoutHeader.js";

export function updateCartQty() {
  let cartQuantity = 0;

  cart.forEach((item) => {
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

  cart.forEach((item) => {
      cartQuantity += item.quantity; 
  });

  renderCheckoutHeader(cartQuantity);
}