import { loadFromStorage, cart } from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";

describe('Test suite: renderorderSummary', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productId3 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

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

    document.querySelector('.js-test-container').innerHTML = '';
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

    document.querySelector('.js-test-container').innerHTML = '';
  });
});