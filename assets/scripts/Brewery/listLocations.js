function getBreweriesByCityName(storedCityName) {
  $.ajax({
    method: "GET",
    url: `https://api.openbrewerydb.org/breweries?by_city=${storedCityName}`,
    success: (breweriesInCity) => {
      if (breweriesInCity.length < 1) {
        displayErrorMessageForUser()
      } else {
        for (let i = 0; i < 10; i++) {
          let output = renderBrewery(breweriesInCity[i])
          containerForBreweryContainers.appendChild(output)
        }
      }
    },
    error: (error) => {
      console.error(error)
      displayErrorMessageForUser()
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

  websiteTitle.className = "info-title"
  addressTitle.className = "info-title"
  phoneTitle.className = "info-title"
  breweryPhone.className = "mb-2rem"

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

  addressBlock.append(breweryCity, breweryState, breweryPostal)
  breweryAddress.append(breweryStreet, addressBlock)
  breweryContainer.append(
    breweryName,
    websiteTitle,
    breweryUrl,
    addressTitle,
    breweryAddress,
    phoneTitle,
    breweryPhone)

  return breweryContainer
}

function displayErrorMessageForUser() {
  localStorage.clear()
  const errorMessage = document.createElement("h1")
  errorMessage.textContent = "No locations found."
  const tryAgainBtn = document.createElement("a")
  tryAgainBtn.className = "try-again-btn"
  tryAgainBtn.textContent = "Try Again"
  tryAgainBtn.setAttribute("href", "go-out.html")
  cityNameTitle.textContent = "Zero"
  containerForBreweryContainers.append(errorMessage, tryAgainBtn)
}

const cityNameOnForm = localStorage.getItem("breweryCityName")
const containerForBreweryContainers = document.querySelector(".brewery-content")
const cityNameTitle = document.getElementById("city-name")

getBreweriesByCityName(cityNameOnForm)
