function handleAlcoholFormSubmit(event) {
  event.preventDefault()
  const alcoholSelectionForm = new FormData(event.target)
  const alcohol = alcoholSelectionForm.get("alcohol")
  localStorage.setItem("alcoholType", alcohol)
  window.location.href = "list-recipes.html"
}

const alcoholForm = document.getElementById("pick-alcohol-form")
alcoholForm.addEventListener("submit", handleAlcoholFormSubmit)
