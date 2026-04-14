export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  // this will add the order to the front of the array instead of the back
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}