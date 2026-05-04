import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { formatOrderDate } from "./utils/formatOrderDate.js";

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

  const deliveryTime = new Date(orderedItem.estimatedDeliveryTime);
  const orderTimeParsed = new Date(order.orderTime);
  const currentTime = new Date();
  const percent = Math.min(100, Math.max(0, ((currentTime - orderTimeParsed) / (deliveryTime - orderTimeParsed)) * 100 ));

  let status;

    if (percent < 50) {
      status = 'Preparing';
    } else if (percent < 100) {
      status = 'Shipped';
    } else {
      status = 'Delivered'
    }

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
          Arriving on ${formatOrderDate(orderedItem.estimatedDeliveryTime)}
        </div>

        <div class="product-info">
          ${productItem.name}
        </div>

        <div class="product-info">
          ${orderedItem.quantity}
        </div>

        <img class="product-image" src="${productItem.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${status === 'Preparing' ? 'current-status' : ''}">
            Preparing
          </div>
          <div class="progress-label ${status === 'Shipped' ? 'current-status' : ''}">
            Shipped
          </div>
          <div class="progress-label ${status === 'Delivered' ? 'current-status' : ''}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width:${percent}%;"></div>
        </div>
    `

  document.querySelector('.js-order-tracking-container').innerHTML = trackingHTML;
};