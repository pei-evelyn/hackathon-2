function handleAlcoholFormSubmit(event) {
  event.preventDefault()
  const alcoholSelectionForm = new FormData(event.target)
  const alcohol = alcoholSelectionForm.get("alcohol")
  localStorage.setItem("alcoholType", alcohol)
  window.location.href = "list-recipes.html"
  body.classList.add("leaving")
}

const alcoholForm = document.getElementById("pick-alcohol-form")
alcoholForm.addEventListener("submit", handleAlcoholFormSubmit)


const body = document.querySelector("body")
window.addEventListener("load", function () {
  body.className = "loaded"
})
