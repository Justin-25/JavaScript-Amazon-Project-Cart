import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js'


async function loadPage() {
  // it will wait for this line to finish and get the response from the backend before going to the next line
  await loadProductsFetch();

  // we can simply save whatever is resolve inside a variable
  const value = await new Promise((resolve) => {
    cart.loadCart(() => {
      console.log('display products');
      resolve('value3'); // this value will be saved in the next step
    });
  });

  console.log('next step')
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

};

loadPage();

/*
// - lets us run multiple promises at the same time
// - and wait for all of them to finish
Promise.all([

  loadProductsFetch(),

    // new Promise((resolve) => {
    //   console.log('start promise');
    //   // Asynchronous function
    //   loadProducts(() => {
    //     console.log('finished loading products')
    //     // first feature is we can give resoleve() a value
    //     resolve('value1');
    //   });
    // }),

  new Promise((resolve) => {
    cart.loadCart(() => {
      console.log('finished loading cart')
      resolve('value2');
    });
  })
  
]).then((value) => {
  console.log(value);
  console.log('next step');
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  console.log('start promise');
  // Asynchronous function
  loadProducts(() => {
    console.log('finished loading products')
    // first feature is we can give resoleve() a value
    resolve('value1');
  });

  // so whatever we give to resolve is going to be saved in a parameter inside .then(()) and now we can use it 
  // this lets us share a value between two steps of a promise
}).then((value) => {
  console.log(value);

  return new Promise((resolve) => {
    cart.loadCart(() => {
      console.log('finished loading cart')
      resolve();
    });
  });

}).then(() => {
  console.log('next step')
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

});


nesting means having code inside code
loadProducts(() => {
  cart.loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  })
});
*/