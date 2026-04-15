// const xhr = new XMLHttpRequest();

// xhr.addEventListener('load', () => {
//   console.log(xhr.response);
// })

// xhr.open('GET', 'https://supersimplebackend.dev');
// // xhr.open('GET', 'https://supersimplebackend.dev/hello');
// // xhr.open('GET', 'https://supersimplebackend.dev/products/first');
// // xhr.open('GET', 'https://supersimplebackend.dev/not-supported');
// // xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jp');

// xhr.send();

const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  xhr.response;
})

xhr.open('GET', 'https://supersimplebackend.dev/greeting');
xhr.send();

fetch('https://supersimplebackend.dev/greeting').then((response) => {
  return response.text()
}).then((greeting) => {
  // console.log(greeting)
})

async function loadFetch() {
  try {
    const response = await fetch('https://amazon.com');
    const text = await response.json();
    console.log(text);
  } catch (error) {
    error = 'Unexpected Error; Please try again later...'
    return console.log(error)
  }
}

// loadFetch()

async function yourName() {
  const response =  await fetch('https://supersimplebackend.dev/greeting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: "Railyn"
    })
  });
  const name = await response.text();
  console.log(name)
}

// yourName()

async function data() {
  try {
    const response = await fetch('https://supersimplebackend.dev/greeting', {
      method: 'POST'
    });

    if (response.status >= 400) {
      throw response;
    };

    const responseData = await response.text();
    console.log(responseData);

  } catch (error) {
    if (error.status === 400) {
      console.log(await error.json())
    } else {
      console.log('Network error. Please try again later.')
    }
  }
}

data()