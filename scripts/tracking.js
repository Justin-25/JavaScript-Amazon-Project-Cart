import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";

renderTrackingItem();

async function renderTrackingItem() {
  await loadProductsFetch();

  renderTrackingGrid();
}

function renderTrackingGrid() {
  let trackingHTML = '';

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  const order = orders.find(order => order.id === orderId);
  const orderedItem = order?.products.find(item => item.productId === productId);

    const productItem = getProduct(orderedItem.productId);

    if (!orderedItem) {
      return;
    }

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
          ${orderedItem.quantity}
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

  document.querySelector('.js-order-tracking-container').innerHTML = trackingHTML;
};