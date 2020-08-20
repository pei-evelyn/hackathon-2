function handleSubmit(event) {
  const breweryFormInput = document.querySelector(".city-text-input").firstElementChild
  let cityName = breweryFormInput.value
  cityName = cityName.toLowerCase()
  cityName = cityName.replace(" ", "_")
  localStorage.setItem("breweryCityName", cityName)
  breweryFormInput.value = ""
}

const submitBtn = document.getElementById("brewery-submit-btn")
submitBtn.addEventListener("click", handleSubmit)
