export function renderCheckoutHeader (cartQuantity) {
  document.querySelector('.js-checkout-header')
    .innerHTML = `
      Checkout (<a class="return-to-home-link js-quantity-items"
      href="amazon.html">${cartQuantity} items</a>)
    ` 
}