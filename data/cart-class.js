import { deliveryOptions } from "./deliveryOptions.js";

class Cart {
  cartItems; // Public property
  #localStorageKey; // Private property

  constructor (localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadFromStorage(); 
  };

      // Shorthand Method Syntax - Shortcut for loadFromStorage: function () {}
  loadFromStorage () {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        },
        {
          productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
          quantity: 3,
          deliveryOptionId: '3'
        }
      ];
    };
  };

  saveToCart () {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  };

  addToCart (productId) {

    let selectedQuantity;
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);

    if (quantitySelector) {
      selectedQuantity = quantitySelector.value;
    } else {
      selectedQuantity = 1;
    }
    
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += Number(selectedQuantity);
    } else {
      this.cartItems.push({
        productId,
        quantity: Number(selectedQuantity),
        deliveryOptionId: '1'
      });
    };

    this.saveToCart();
  };

  removeFromCart (productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToCart();
  };

  updateQuantity (productId, newQuantity) {
    let matchingQuantity;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingQuantity = cartItem;
      }
    });

    const newCart = [];

    if (newQuantity <= 0) {
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;
    } else if (matchingQuantity) {
      matchingQuantity.quantity = Number(newQuantity);
    } 

    this.saveToCart();
  };

  updateDeliveryOption (productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      };
    });

    if(!matchingItem) {
      return; // Early return if productId not found
    };

    const optionExists = deliveryOptions.some(option => option.id === deliveryOptionId);
    if (!optionExists) {
      return; // Early return if deliveryOptionId not found
    }

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToCart();
  }
};

export const cart = new Cart('cart');