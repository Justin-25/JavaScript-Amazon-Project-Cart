const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
})

xhr.open('GET', 'https://supersimplebackend.dev');
// xhr.open('GET', 'https://supersimplebackend.dev/hello');
// xhr.open('GET', 'https://supersimplebackend.dev/products/first');
// xhr.open('GET', 'https://supersimplebackend.dev/not-supported');
// xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jp');

xhr.send();