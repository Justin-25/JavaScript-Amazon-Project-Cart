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