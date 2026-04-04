import { cart, removeFromCart, updateDeliveryOption, updateQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { calculateCartQty } from "../utils/updateQty.js";
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";


export function renderOrderSummary () {
    
  let cartSummaryHtml = '';

  cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const deliveryDateFormat = calculateDeliveryDate(deliveryOption);

      cartSummaryHtml += `
        <div class="cart-item-container 
          js-cart-item-container
          js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${deliveryDateFormat}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name js-product-name-${matchingProduct.id}">
                    ${matchingProduct.name}
                </div>
                <div class="product-price js-product-price-${matchingProduct.id}">
                    ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                    Update
                    </span>
                    <input type="text" class="quantity-input js-quantity-input" data-product-id="${matchingProduct.id}">
                    <span class="js-error-message"></span>
                    <span class="save-quantity-link link-primary js-save-quantity" data-product-id="${matchingProduct.id}">
                    Save
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link
                      js-delete-link-${matchingProduct.id}"
                      data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                      Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
        </div>
      `;
  });

  function deliveryOptionsHTML (matchingProduct, cartItem) {
    let deliveryHtml = '';

    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDateFormat = calculateDeliveryDate(deliveryOption);
      const price = deliveryOption.priceCents
        === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      deliveryHtml += `
      <div class="delivery-option js-delivery-option
        js-delivery-option-${matchingProduct.id}
        js-delivery-options-${deliveryOption.id}
      "
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}"
      >
        <input type="radio"
        ${isChecked ? 'checked' : '' }
        class="delivery-option-input 
          js-delivery-input-${matchingProduct.id}
          js-delivery-option-input-${deliveryOption.id}
        "
        name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
              ${deliveryDateFormat}
          </div>
          <div class="delivery-option-price">
              ${price} Shipping
          </div>
        </div>
      </div>
      `
    });

    return deliveryHtml;
  };

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });

  calculateCartQty();

  document.querySelectorAll('.js-update-link')
    .forEach((update) => {
      update.addEventListener('click', () => {
        const productId = update.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
          container.classList.add('is-editing-quantity');
      });
    });

  document.querySelectorAll('.js-save-quantity')
    .forEach((save) => {
      save.addEventListener('click', () => {
        const productId = save.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
          container.classList.remove('is-editing-quantity');

        const addQty = container.querySelector('.js-quantity-input');
        let newQuantity = Number(addQty.value);

        if (addQty.value === '') {
          return container.querySelector('.js-error-message').innerHTML = 'Error Input';
        } else if (isNaN(newQuantity)) {
          return container.querySelector('.js-error-message').innerHTML = 'Kindly try again...';
        } else if (newQuantity >= 0 && newQuantity < 1000) {
          updateQuantity(productId, newQuantity);
        }

        updateQuantity(productId, newQuantity);
        renderOrderSummary();
        renderPaymentSummary();
      })
    });

  document.querySelectorAll('.js-quantity-input')
    .forEach((keyInput) => {
      keyInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const productId = keyInput.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
              container.querySelector('.js-save-quantity').click();
        }
      });
    });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { 
          productId,
          deliveryOptionId
        } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId)
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
};
