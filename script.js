'use strict'

const btn = document.querySelector('.btn-country')
const countriesContainer = document.querySelector('.countries')

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg)
  //   countriesContainer.style.opacity = 1
}

const renderCountry = function (data, className = '') {
  const html = `
            <article class="country ${className}">
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}m people </p>
                <p class="country__row"><span>🗣️</span>${
                  data.languages[Object.keys(data.languages)[0]]
                }</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies[Object.keys(data.currencies)[0]].name
                }</p>
                </div>
                </article>
                `

  countriesContainer.insertAdjacentHTML('beforeend', html)
  countriesContainer.style.opacity = 1
}

const getJson = function (url, errorMsg = 'Something went wrong!') {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`)

    return response.json()
  })
}

///////////////////////////////////////
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest()
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
//   request.send()

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText)
//     console.log(data)

//     const html = `
//         <article class="country">
//         <img class="country__img" src="${data.flags.png}" />
//         <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)}m people </p>
//             <p class="country__row"><span>🗣️</span>${
//               data.languages[Object.keys(data.languages)[0]]
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[Object.keys(data.currencies)[0]].name
//             }</p>
//             </div>
//             </article>
//             `
//     countriesContainer.insertAdjacentHTML('beforeend', html)
//     countriesContainer.style.opacity = 1
//   })
// }

////////////////////////////////////////////////
// CALLBACK HELL
///////////////////////////////////////////////

// const getCountryAndNeighbor = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest()
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
//   request.send()

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText)
//     console.log(data)

//     // Render country 1
//     renderCountry(data)

//     // Get neighbour country
//     const [neighbour] = data.borders

//     if (!neighbour) return

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest()
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`)
//     request2.send()

//     request2.addEventListener('load', function () {
//       const [data] = JSON.parse(this.responseText)
//       renderCountry(data, 'neighbour')
//       console.log(data)
//     })
//   })
// }

// // getCountryAndNeighbor('portugal')
// getCountryAndNeighbor('usa')

////////////////////////////////////////////////
// PROMISES AND FETCH API
///////////////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest()
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
//   request.send()
// }

// const getContryData = function (coutry) {
//   fetch(`https://restcountries.com/v3.1/name/${coutry}`)
//     .then((response) => {
//       console.log(response)
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`)

//       return response.json()
//     })
//     .then((data) => {
//       renderCountry(data[0])
//       const neighbour = data[0].borders[0]

//       if (!neighbour) return
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
//         .then((response) => response.json())
//         .then((data) => {
//           renderCountry(data[0], 'neighbour')
//           // const neighbour = data[0].borders[0]
//           const neighbour = 'fejhjehfjeh'

//           return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
//             .then((response) => {
//               if (!response.ok)
//                 throw new Error(`Country not found (${response.status})`)

//               response.json()
//             })
//             .then((data) => renderCountry(data[0], 'neighbour'))
//         })
//     })
//     .catch((err) => {
//       renderError(`Something went wrong ⁉️ ${err.message}. Try again!`)
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1
//     })
// }

// const getContryData = function (coutry) {
//   getJson(`https://restcountries.com/v3.1/name/${coutry}`, 'Country not found')
//     .then((data) => {
//       renderCountry(data[0])
//       const neighbour = data[0].borders[0]

//       if (!neighbour) return

//       return getJson(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         'Country not found'
//       ).then((data) => {
//         renderCountry(data[0], 'neighbour')
//         const neighbour = data[0].borders[0]

//         if (!neighbour) throw new Error('No neighbour found!')
//       })
//     })
//     .catch((err) => {
//       renderError(`Something went wrong ⁉️ ${err.message}. Try again!`)
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1
//     })
// }

// btn.addEventListener('click', () => {
//   getContryData('portugal')
// })
// getContryData('australia')

//////////////////////////////////////////////
// Challenge #1
/////////////////////////////////////////////
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz//${lat},${lng}?geoit=json`)
//     .then((res) => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`)
//       return res.json()
//     })
//     .then((data) => {
//       console.log(data)
//       console.log(`You are in ${data.city}, ${data.country}`)

//       return fetch(`https://restcountries.com/v3.1/name/${data.coutry}`)
//     })
//     .then((res) => {
//       if (res.ok) throw new Error(`Country not found (${res.status})`)

//       return res.json()
//     })
//     .then((data) => renderCountry(data[0]))
//     .catch((err) => console.error(`${err.message} 📠`))
// }
// whereAmI(52.508, 13.381)
// whereAmI(19.037, 72.873)
// whereAmI(-33.933, 18.474)

//////////////////////////////////////////////
// THE EVENT LOOP
/////////////////////////////////////////////
// console.log('Test start')
// setTimeout(() => console.log('0 second timer'), 0)
// Promise.resolve('Resolved promise 1').then((res) => console.log(res))

// Promise.resolve('Promise 2').then((res) => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res)
// })

// console.log('Test end')

//////////////////////////////////////////////
// SIMPLE PROMISES
/////////////////////////////////////////////
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening 🔮')
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰')
//     } else {
//       reject(new Error('You lost 😞'))
//     }
//   }, 2000)
// })
// lotteryPromise
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err))

// // Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000)
//   })
// }
// wait(1).then(() => {
//   console.log('1 second passed')
//   return wait(1).then(() => {
//     console.log('2 second passed')
//     return wait(1).then(() => {
//       console.log('3 second passed')
//     })
//   })
// })

// Promise.resolve('abc').then((x) => console.log(x))
// Promise.reject(new Error('Problem!')).catch((x) => console.error(x))

//////////////////////////////////////////////
// Promisifying the Geolocation API
/////////////////////////////////////////////

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   (position) => resolve(position),
//     //   (err) => reject(err)
//     // )
//     navigator.geolocation.getCurrentPosition(resolve, reject)
//   })
// }

// getPosition().then((pos) => console.log(pos))

// const whereAmI = function (lat, lng) {
//   getPosition()
//     .then((pos) => {
//       const { latitude: lat, longitude: lng } = pos.coords

//       return fetch(`https://geocode.xyz//${lat},${lng}?geoit=json`)
//     })

//     .then((res) => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`)
//       return res.json()
//     })
//     .then((data) => {
//       console.log(data)
//       console.log(`You are in ${data.city}, ${data.country}`)

//       return fetch(`https://restcountries.com/v3.1/name/${data.coutry}`)
//     })
//     .then((res) => {
//       if (res.ok) throw new Error(`Country not found (${res.status})`)

//       return res.json()
//     })
//     .then((data) => renderCountry(data[0]))
//     .catch((err) => console.error(`${err.message} 📠`))
// }

// btn.addEventListener('click', whereAmI)

//////////////////////////////////////////////
// Challenge #2
/////////////////////////////////////////////
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000)
  })
}

const imgContainer = document.querySelector('.images')

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img')
    img.src = imgPath

    img.addEventListener('load', function () {
      imgContainer.append(img)
      resolve(img)
    })

    img.addEventListener('error', function () {
      reject(new Error('Image not found'))
    })
  })
}

let current

createImage('img/img-1.jpg')
  .then((img) => {
    current = img
    console.log('Image 1 loaded')
    return wait(2)
  })
  .then(() => {
    current.style.display = 'none'
    return createImage('img/img-2.jpg')
  })
  .then((img) => {
    current = img
    console.log('Image 2 loaded')
    return wait(2)
  })
  .then(() => {
    current.style.display = 'none'
  })
  .catch((err) => console.error(err))
