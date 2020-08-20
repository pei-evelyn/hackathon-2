function getDataWithInput(storedCityName) {
  $.ajax({
    method: "GET",
    url: `https://api.openbrewerydb.org/breweries?by_city=${storedCityName}`,
    success: (data) => {
      if (data.length > 1) {
        handleDataSuccess(data)
      } else {
        handleDataError()
      }
    },
    error: (error) => {
      handleDataError()
    }
  })
}

function handleDataSuccess (data) {
  console.log(data)
  for (let i = 1; i < 10; i++) {
    const breweryName = document.createElement("h3")
    const websiteTitle = document.createElement("h5")
    const breweryUrl = document.createElement("a")
    const addressTitle = document.createElement("h5")
    const breweryAddress = document.createElement("div")
    const breweryStreet = document.createElement("p")
    const addressPara = document.createElement("p")
    const breweryCity = document.createElement("span")
    const breweryState = document.createElement("span")
    const breweryPostal = document.createElement("span")
    const phoneTitle = document.createElement("h5")
    const breweryPhone = document.createElement("p")

    websiteTitle.className = "info-title"
    addressTitle.className = "info-title"
    phoneTitle.className = "info-title"
    websiteTitle.textContent = "Website"
    addressTitle.textContent = "Address"
    phoneTitle.textContent = "Phone"

    breweryName.textContent = data[i].name
    breweryUrl.textContent = data[i].website_url
    breweryUrl.setAttribute("href", data[i].website_url)
    breweryStreet.textContent = data[i].street
    breweryCity.textContent = `${data[i].city}, `
    breweryState.textContent = `${data[i].state} `
    breweryPostal.textContent = data[i].postal_code
    breweryPhone.textContent = data[i].phone
    breweryPhone.className = "mb-2rem"
    addressPara.append(breweryCity, breweryState, breweryPostal)
    breweryAddress.append(breweryStreet, addressPara)
    contentContainer.append(breweryName, websiteTitle, breweryUrl, addressTitle,
      breweryAddress, phoneTitle, breweryPhone)
    inputCityName.textContent = data[i].city
  }
}

function handleDataError() {
  localStorage.clear()
  const errorMessage = document.createElement("h1")
  const tryAgainBtn = document.createElement("a")
  tryAgainBtn.className = "try-again-btn"
  errorMessage.textContent = "No locations found."
  tryAgainBtn.textContent = "Try Again"
  tryAgainBtn.setAttribute("href", "go-out.html")
  inputCityName.textContent = "Zero"
  contentContainer.append(errorMessage, tryAgainBtn)
}

const storedCityName = localStorage.getItem("breweryCityName")
const contentContainer = document.querySelector(".brewery-content")
const inputCityName = document.getElementById("city-name")
getDataWithInput(storedCityName)
