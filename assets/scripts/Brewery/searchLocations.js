function handleSubmit(event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  const cityName = formData
    .get("city")
    .toLowerCase()
    .replace(" ", "_")
  localStorage.setItem("breweryCityName", cityName)
  window.location.href = "list-breweries.html"
}

const breweryForm = document.getElementById("brewery-form")
breweryForm.addEventListener("submit", handleSubmit)

const body = document.querySelector("body")
window.addEventListener("load", function () {
  body.className = "loaded"
})
