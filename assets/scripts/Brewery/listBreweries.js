function getBreweriesByCityName(storedCityName) {
  $.ajax({
    method: "GET",
    url: `https://api.openbrewerydb.org/breweries?by_city=${storedCityName}`,
    success: (breweriesInCity) => {
      if (breweriesInCity.length < 1) {
        localStorage.clear()
        const userErrorMessage = renderErrorMessageForUser()
        containerForBreweryContainers.appendChild(userErrorMessage)
      } else {
        for (let i = 0; i < 10; i++) {
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
    }
  })
}

function renderBrewery(breweryInfo) {
  const breweryContainer = document.createElement("div")
  const breweryName = document.createElement("h3")
  const websiteTitle = document.createElement("h5")
  const breweryUrl = document.createElement("a")
  const addressTitle = document.createElement("h5")
  const breweryAddress = document.createElement("div")
  const breweryStreet = document.createElement("p")
  const addressBlock = document.createElement("p")
  const breweryCity = document.createElement("span")
  const breweryState = document.createElement("span")
  const breweryPostal = document.createElement("span")
  const phoneTitle = document.createElement("h5")
  const breweryPhone = document.createElement("p")

  breweryContainer.className = "bg-color-white width-100 padding-1 mb-2rem"
  websiteTitle.className = "info-title "
  addressTitle.className = "info-title "
  phoneTitle.className = "info-title "

  websiteTitle.textContent = "Website"
  addressTitle.textContent = "Address"
  phoneTitle.textContent = "Phone"
  breweryName.textContent = breweryInfo.name
  breweryUrl.textContent = breweryInfo.website_url
  breweryStreet.textContent = breweryInfo.street
  breweryCity.textContent = `${breweryInfo.city}, `
  breweryState.textContent = `${breweryInfo.state} `
  breweryPostal.textContent = breweryInfo.postal_code
  breweryPhone.textContent = breweryInfo.phone

  breweryUrl.setAttribute("href", breweryInfo.website_url)
  breweryUrl.setAttribute("target", "_blank")

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

  return breweryContainer
}

function renderErrorMessageForUser() {
  const errorMessageContainer = document.createElement("div")
  const errorMessage = document.createElement("h1")
  const buttonContainer = document.createElement("div")
  const tryAgainBtn = document.createElement("a")
  errorMessage.className = "mb-2rem"
  buttonContainer.className = "mt-3rem mb-2rem text-center"
  tryAgainBtn.className = "try-again-btn"
  errorMessage.textContent = "No locations found."
  tryAgainBtn.textContent = "Try Again"
  cityNameTitle.textContent = "Zero"
  tryAgainBtn.setAttribute("href", "lets-go-out.html")
  buttonContainer.appendChild(tryAgainBtn)
  errorMessageContainer.append(errorMessage, buttonContainer)

  return errorMessageContainer
}


const cityNameOnForm = localStorage.getItem("breweryCityName")
const containerForBreweryContainers = document.querySelector(".brewery-content")
const cityNameTitle = document.getElementById("city-name")
const webpageBg = document.querySelector("brewery-bg")

getBreweriesByCityName(cityNameOnForm)

const body = document.querySelector("body")
window.addEventListener("load", function () {
  body.className = "loaded"
})
