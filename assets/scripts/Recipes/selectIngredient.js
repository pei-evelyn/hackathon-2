function handleSubmit(event) {
  const recipeFormSelection = document.getElementById("alcohol-selection")
  let ingredient = recipeFormSelection.value
  localStorage.setItem("ingredientName", ingredient)
  recipeFormSelection.value = ""
}

const submitBtn = document.getElementById("stayin-submit-btn")
submitBtn.addEventListener("click", handleSubmit)
