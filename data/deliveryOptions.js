import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}]


export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

function isWeekend(date) {
  const week = date.format('dddd');

  if (week === 'Sunday' || week === 'Saturday') {
    return true;
  } else {
    return false;
  }
}

export function calculateDeliveryDate(deliveryOption) {

    const todaysDate = dayjs();
    let currentDate = todaysDate;
    let remainingDays = deliveryOption.deliveryDays;

    while (remainingDays > 0) {
      currentDate = currentDate.add(1, 'day');
      if (isWeekend(currentDate)) {
        remainingDays
      } else {
        remainingDays--;
      }
    }

    const presentDate = currentDate.format('dddd, MMMM D')

    return presentDate;
}