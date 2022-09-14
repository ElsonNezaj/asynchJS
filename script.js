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
            <img class="country__img" src="${data.flag}" />
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
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000)
//   })
// }

// const imgContainer = document.querySelector('.images')

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img')
//     img.src = imgPath

//     img.addEventListener('load', function () {
//       imgContainer.append(img)
//       resolve(img)
//     })

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'))
//     })
//   })
// }

// let current

// createImage('img/img-1.jpg')
//   .then((img) => {
//     current = img
//     console.log('Image 1 loaded')
//     return wait(2)
//   })
//   .then(() => {
//     current.style.display = 'none'
//     return createImage('img/img-2.jpg')
//   })
//   .then((img) => {
//     current = img
//     console.log('Image 2 loaded')
//     return wait(2)
//   })
//   .then(() => {
//     current.style.display = 'none'
//   })
//   .catch((err) => console.error(err))

//////////////////////////////////////////////
// Consuming Promises
/////////////////////////////////////////////
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject)
//   })
// }

// const whereAmI = async function () {
//   try {
//     // Geolocation
//     const pos = await getPosition()
//     const { latitude: lat, longitude: lng } = pos.coords
//     // Reverse geo data
//     const geo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     if (!geo.ok) throw new Error('Problem getting location data')

//     const geoData = await geo.json()
//     // Country data
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${geoData.country}`
//     )
//     if (!res.ok) throw new Error('Problem getting country')

//     const data = await res.json()
//     renderCountry(data[0])

//     return `2: You are in ${geoData.city}, ${geoData.country}`
//   } catch (err) {
//     renderError(`Something went wrong ${err.message}`)

//     throw err
//   }
// }

// console.log('1: Will get location')
// ;(async function () {
//   try {
//     const city = await whereAmI()
//     console.log(city)
//   } catch (err) {
//     console.error(`2: ${err.message}`)
//   }
//   console.log('3: Finished getting location')
// })()

//////////////////////////////////////////////
// RUNNING PROMISES IN PARALLEL
/////////////////////////////////////////////
// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJson(`https://restcountries.com/v3.1/name/${c1}`)
//     // const [data2] = await getJson(`https://restcountries.com/v3.1/name/${c2}`)
//     // const [data3] = await getJson(`https://restcountries.com/v3.1/name/${c3}`)
//     const data = await Promise.all([
//       getJson(`https://restcountries.com/v3.1/name/${c1}`),
//       getJson(`https://restcountries.com/v3.1/name/${c2}`),
//       getJson(`https://restcountries.com/v3.1/name/${c3}`),
//     ])

//     console.log(data.map((d) => d[0].capital))
//   } catch (err) {
//     console.error(err)
//   }
// }
// get3Countries('portugal', 'canada', 'tanzania')

//////////////////////////////////////////////
// RACE, ALLSETTLED , ANY
/////////////////////////////////////////////

// Promise.race
// ;(async function () {
//   const res = await Promise.race([
//     getJson(`https://restcountries.com/v3.1/name/italy`),
//     getJson(`https://restcountries.com/v3.1/name/egypt`),
//     getJson(`https://restcountries.com/v3.1/name/mexico`),
//   ])
//   console.log(res[0])
// })()

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long'))
//     }, s * 1000)
//   })
// }

// Promise.race([
//   getJson(`https://restcountries.com/v3.1/name/tanzania`),
//   timeout(5),
// ])
//   .then((res) => console.log(res[0]))
//   .catch((err) => console.error(err))

// // Promise.allSettled
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Success'),
// ]).then((res) => console.log(res))

// // Promise.any

// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Success'),
// ]).then((res) => console.log(res))

//////////////////////////////////////////////
// Challenge #3
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

// createImage('img/img-1.jpg')
//   .then((img) => {
//     current = img
//     console.log('Image 1 loaded')
//     return wait(2)
//   })
//   .then(() => {
//     current.style.display = 'none'
//     return createImage('img/img-2.jpg')
//   })
//   .then((img) => {
//     current = img
//     console.log('Image 2 loaded')
//     return wait(2)
//   })
//   .then(() => {
//     current.style.display = 'none'
//   })
//   .catch((err) => console.error(err))

// let image

// const img = async function (nr) {
//   image = await createImage(`img/img-${nr}.jpg`)
//   current = image
//   await wait(2)
//   current.style.display = 'none'
// }

// const loadNPause = async function () {
//   try {
//     await img(1)
//     await img(2)
//     await img(3)
//   } catch (err) {
//     console.error(err)
//   }
// }
// loadNPause()

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (img) => await createImage(img))

    const imgsEL = await Promise.all(imgs)
    console.log(imgsEL)

    imgsEL.forEach((img) => img.classList.add('paralell'))
  } catch (err) {
    console.error(err)
  }
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'])
