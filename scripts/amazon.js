import { cart } from '../data/cart-class.js';
import { products, loadProducts } from '../data/products.js';
import { updateCartQty } from './utils/updateQty.js';
// import '../data/backend-practice.js'

cart.loadCartFetch();
const searchInput = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');
const url = new URL(window.location.href);
const searchQuery = url.searchParams.get('search')?.trim().toLowerCase() || '';

if (searchQuery) {
  searchInput.value = url.searchParams.get('search');
}

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  window.location.href = `amazon.html?search=${encodeURIComponent(query)}`;
});

// In JavaScript functions are values and we can use a function as a parameter.
// Callback - renderProductsGrid
loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let productsHtml = '';

  const productToShow = searchQuery ? products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(searchQuery);
    const keywordMatch = product.keywords.some(keyword => 
      keyword.toLowerCase().includes(searchQuery)
    );
    return nameMatch || keywordMatch;
  }) : products;

  if (productToShow.length === 0) {
    productsHtml = `
    <div class="no-results">
      No products found for "${url.searchParams.get('search')}"
    </div>
    `;
  } else {
    productToShow.forEach((product) => {
      productsHtml += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `
    });
  }

  document.querySelector('.js-products').innerHTML = productsHtml;

  let timeoutId = null;

  updateCartQty();

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const { productId } = button.dataset;

        cart.addToCart(productId);
        updateCartQty();

        const message = button.closest('.product-container').querySelector('.js-added-to-cart');
        message.classList.add('opacity');
        
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        };
        
        timeoutId = setTimeout(() => {
            message.classList.remove('opacity');
        }, 2000);
      });
    });
}