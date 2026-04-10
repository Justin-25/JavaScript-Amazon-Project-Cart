import { cart } from "../../data/cart-class.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../../scripts/utils/money.js";
import { loadProducts } from "../../data/products.js";

describe('Test suite: renderorderSummary', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  let product1;
  let product2;

  let productPrice1;
  let productPrice2;

  beforeAll((done) => {
    loadProducts(() => {
      product1 = getProduct(productId1);
      product2 = getProduct(productId2);

      expect(product1).toBeDefined();
      expect(product2).toBeDefined();

      productPrice1 = formatCurrency(product1.priceCents);
      productPrice2 = formatCurrency(product2.priceCents)
      // done() lets us control when to go to the next step
      done();
    });
  });

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
      ]);
    });
    cart.loadFromStorage();
    renderOrderSummary();
  })

  it('display the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toContain(product1.name);

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain(product2.name);

    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toContain('$' + productPrice1);

    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toContain('$' + productPrice2);

  });

  it('removes a product', () => {
      document.querySelector(`.js-delete-link-${productId1}`).click()
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
  });

  it('get the 3rd delivery option', () => {
    document.querySelectorAll(`.js-delivery-option-${productId1}`)[2].click();
    expect(
      document.querySelector(`.js-delivery-option-input-3`).checked
    ).toBe(true);
    expect(cart.cartItems.length).toEqual(2)
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
    expect(
      document.querySelector('.js-shipping-price').innerText
    ).toEqual('$14.98');
    expect(
      document.querySelector('.js-total-price').innerText
    ).toEqual('$63.50');
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  })
});