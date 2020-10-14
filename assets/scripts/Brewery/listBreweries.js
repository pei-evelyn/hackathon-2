function getBreweriesByCityName(storedCityName) {
  $.ajax({
    method: "GET",
    url: `https://api.openbrewerydb.org/breweries?by_city=${storedCityName}`,
    success: (breweriesInCity) => {
      console.log(breweriesInCity)
      if (breweriesInCity.length < 1) {
        localStorage.clear()
        const userErrorMessage = renderErrorMessageForUser()
        containerForBreweryContainers.appendChild(userErrorMessage)
        webpageBg.classList.add("height-100vh")
      } else {
        for (let i = 0; i < breweriesInCity.length; i++) {
          let renderBreweryOutput = renderBrewery(breweriesInCity[i])
          containerForBreweryContainers.appendChild(renderBreweryOutput)
        }
        cityNameTitle.textContent = breweriesInCity[0].city
      }
    },
    error: (error) => {
      console.error(error)
      const userErrorMessage = renderErrorMessageForUser()
      containerForBreweryContainers.appendChild(userErrorMessage)
      webpageBg.classList.add("height-100vh")
    }
  })
}

function renderBrewery(breweryInfo) {
  const breweryContainer = document.createElement("div")
  const breweryName = document.createElement("h3")
  const websiteTitle = document.createElement("h4")
  const breweryUrl = document.createElement("a")
  const addressTitle = document.createElement("h4")
  const breweryAddress = document.createElement("div")
  const breweryStreet = document.createElement("p")
  const addressBlock = document.createElement("p")
  const breweryCity = document.createElement("span")
  const breweryState = document.createElement("span")
  const breweryPostal = document.createElement("span")
  const phoneTitle = document.createElement("h4")
  const breweryPhone = document.createElement("a")

  breweryContainer.className = "bg-color-white brewery-container padding-1 mb-2rem opacity-95"
  websiteTitle.className = "info-title drink-text"
  addressTitle.className = "info-title drink-text"
  phoneTitle.className = "info-title drink-text"

  websiteTitle.textContent = "WEBSITE"
  addressTitle.textContent = "ADDRESS"
  phoneTitle.textContent = "PHONE"
  breweryName.textContent = breweryInfo.name
  breweryUrl.textContent = breweryInfo.website_url.toLowerCase()
  breweryStreet.textContent = breweryInfo.street
  breweryCity.textContent = `${breweryInfo.city}, `
  breweryState.textContent = `${breweryInfo.state} `
  breweryPostal.textContent = breweryInfo.postal_code

  const phoneArr = breweryInfo.phone.split("")
  phoneArr.unshift('(')
  phoneArr.splice(4, 0, ')')
  phoneArr.splice(8, 0, '-')
  breweryPhone.textContent = phoneArr.join('')



  breweryUrl.setAttribute("href", breweryInfo.website_url)
  breweryUrl.setAttribute("target", "_blank")

  breweryPhone.setAttribute("href", `tel:${breweryInfo.phone}`)

  addressBlock.append(breweryCity, breweryState, breweryPostal)
  breweryAddress.append(breweryStreet, addressBlock)
  breweryContainer.append(
    breweryName,
    websiteTitle,
    breweryUrl,
    addressTitle,
    breweryAddress,
    phoneTitle,
    breweryPhone
  )

  if (breweryUrl.textContent === '') {
    websiteTitle.remove()
    breweryUrl.remove()
  }

  if (breweryPhone.textContent === '()-') {
    phoneTitle.remove()
    breweryPhone.remove()
  }

  return breweryContainer
}

function renderErrorMessageForUser() {
  const errorMessageContainer = document.createElement("div")
  const tryAgainBtn = document.createElement("a")
  errorMessageContainer.className = "mt-3rem"
  tryAgainBtn.className = "try-again-btn color-dark-gray d-flex justify-center"
  tryAgainBtn.textContent = "Try Again"
  cityNameTitle.textContent = "No"
  errorMsgTitle.textContent = "Found"
  tryAgainBtn.setAttribute("href", "lets-go-out.html")
  errorMessageContainer.append(tryAgainBtn)

  return errorMessageContainer
}


const cityNameOnForm = localStorage.getItem("breweryCityName")
const containerForBreweryContainers = document.querySelector(".brewery-content")
const cityNameTitle = document.getElementById("city-name")
const errorMsgTitle = document.getElementById("error-msg")
const webpageBg = document.querySelector(".brewery-bg")

getBreweriesByCityName(cityNameOnForm)

const body = document.querySelector("body")
window.addEventListener("load", function () {
  body.className = "loaded"
})
