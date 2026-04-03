import { loadFromStorage, cart } from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../../scripts/utils/money.js";

describe('Test suite: renderorderSummary', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productId3 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

  const product1 = getProduct(productId1);
  const product2 = getProduct(productId2);
  const product3 = getProduct(productId3);

  const productPrice1 = formatCurrency(product1.priceCents);
  const productPrice2 = formatCurrency(product2.priceCents);
  const productPrice3 = formatCurrency(product3.priceCents);

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-checkout-header"></div>
      <div class="js-order-summary"></div>
      <div class="js-cart-quantity"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
        },
        {
          productId: productId3,
          quantity: 3,
          deliveryOptionId: '3'
        }
      ]);
    });
    loadFromStorage();
    renderOrderSummary();
  })

  it('display the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(3);
    
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    expect(
      document.querySelector(`.js-product-quantity-${productId3}`).innerText
    ).toContain('Quantity: 3');

    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toContain(product1.name);

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain(product2.name);

    expect(
      document.querySelector(`.js-product-name-${productId3}`).innerText
    ).toContain(product3.name);

    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toContain('$' + productPrice1);

    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toContain('$' + productPrice2);

    expect(
      document.querySelector(`.js-product-price-${productId3}`).innerText
    ).toContain('$' + productPrice3);
  });

  it('removes a product', () => {
      document.querySelector(`.js-delete-link-${productId1}`).click()
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId3}`)
    ).not.toEqual(null);

    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId2);
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  })
});