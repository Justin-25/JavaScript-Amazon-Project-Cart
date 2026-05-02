import { orders } from "../data/orders";
import { getProduct, loadProductsFetch } from "../data/products";

renderTrackingItem();

async function renderTrackingItem() {
  await loadProductsFetch();

  renderTrackingGrid();
}

function renderTrackingGrid() {
  let trackingHTML = '';

  orders.forEach((orderedId) => {
    const productItem = getProduct(orderedId.productId);

    if (!productItem) {
      return;
    };

    trackingHTML += `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on Monday, June 13
        </div>

        <div class="product-info">
          ${productItem.name}
        </div>

        <div class="product-info">
          ${orderedId.quantity}
        </div>

        <img class="product-image" src="${productItem.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    `
  });

  document.querySelector('.js-order-tracking-container').innerHTML = trackingHTML;
};