export const cart = [];

export function addToCart(productId) {
  let selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`).value;
  let matchingItem;

  cart.forEach((cartItems) => {
    if (productId === cartItems.productId) {
      matchingItem = cartItems;
    }
  });

  if (matchingItem){
    matchingItem.quantity += Number(selectedQuantity);
  } else {
    cart.push({
      productId,
      quantity: Number(selectedQuantity)
    });
  }
}