import { cart } from "../data/cart-class.js";
import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { updateCartQty } from "./utils/updateQty.js";

export function formatOrderDate(orderTime) {
  const dateObject = new Date(orderTime);
  const formattedDate = dateObject.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  })
  return formattedDate;
}

renderOrderItem();

async function renderOrderItem() {
  await loadProductsFetch();

  renderOrdersGrid();
}

function renderOrdersGrid() {
  let orderHtml = '';

  orders.forEach((order) => {
    if(!order.products) {
      return;
    } 

    let orderProductsHtml = '';

    order.products.forEach((orderedItem) => {
      const product = getProduct(orderedItem.productId);
      if (!product) {
        return;
      };

      orderProductsHtml += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            ${formatOrderDate(orderedItem.estimatedDeliveryTime)}
          </div>
          <div class="product-quantity">
            Quantity: ${orderedItem.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again" data-product-id="${product.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message ">Buy it again</span>
          </button>
        </div>

        <div class="product-actions js-track-id">
          <a href="tracking.html?orderId=${order.id}&productId=${orderedItem.productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `
    });

    orderHtml += `
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${formatOrderDate(order.orderTime)}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>

      <div class="order-details-grid js-order-details-grid">
        ${orderProductsHtml}
      </div>
      <br>
    `
  });

  document.querySelector('.js-order-container').innerHTML = orderHtml;

  updateCartQty();

  document.querySelectorAll('.js-buy-again')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        cart.addToCart(productId);
        updateCartQty();
      })
    });

  // document.querySelectorAll('.js-track-id')
  //   .forEach((button) => {
  //     button.addEventListener('click', () => {
  //       const trackId = button.dataset.trackId;
        
  //     })
  //   })
}