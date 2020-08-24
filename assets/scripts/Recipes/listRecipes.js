function getDrinkIdsByAlcoholName(valueName) {
  $.ajax({
    method: "GET",
    url: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${valueName}`,
    success: (data) => {
      alcoholTypeHeading.textContent = valueName
      const drinkIds = selectRandomDrinkIds(data.drinks)
      for (let i = 0; i < drinkIds.length; i++) {
        getDrinkInfo(drinkIds[i])
      }
    },
    error: (error) => {
      console.error(error)
    }
  })
}

function getDrinkInfo(drinkId) {
  $.ajax({
    method: "GET",
    url: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`,
    success: (drinkData) => {
      const drink = drinkData.drinks[0]
      const completeDrink = renderDrinkRecipes(drink)
      drinkRecipeContent.appendChild(completeDrink)
    },
    error: (error) => {
      console.error(error)
    }
  })
}

function selectRandomDrinkIds(drinks) {
  const randomDrinkIds = []
  for (let i = 0; i < 6; i++) {
    const randomNum = Math.floor(Math.random() * drinks.length)
    const randomDrinkIdFromList = parseInt(drinks[randomNum].idDrink)
    randomDrinkIds.push(randomDrinkIdFromList)
  }
  return randomDrinkIds
}

function renderDrinkRecipes(drink) {
  const drinkContainer = document.createElement("div")
  const drinkName = document.createElement("h3")
  const drinkImg = document.createElement("img")
  const ingredientTitle = document.createElement("h4")
  const ingredientList = document.createElement("ul")
  const ingredient1 = document.createElement("li")
  const ingredient2 = document.createElement("li")
  const ingredient3 = document.createElement("li")
  const ingredient4 = document.createElement("li")
  const ingredient5 = document.createElement("li")
  const ingredient6 = document.createElement("li")
  const directionTitle = document.createElement("h4")
  const instructions = document.createElement("p")

  drinkContainer.className = "bg-color-white width-100 padding-1 mb-2rem d-flex flex-column"
  drinkName.className = "padding-1"
  drinkImg.className = "drink-img-size"
  ingredientTitle.className = "info-title"
  directionTitle.className = "info-title"

  drinkImg.setAttribute("src", drink.strDrinkThumb)
  drinkName.textContent = drink.strDrink.toUpperCase()
  ingredientTitle.textContent = "INGREDIENTS"
  ingredient1.textContent = `${drink.strMeasure1} ${drink.strIngredient1}`
  ingredient2.textContent = `${drink.strMeasure2} ${drink.strIngredient2}`
  ingredient3.textContent = `${drink.strMeasure3} ${drink.strIngredient3}`
  ingredient4.textContent = `${drink.strMeasure4} ${drink.strIngredient4}`
  ingredient5.textContent = `${drink.strMeasure5} ${drink.strIngredient5}`
  ingredient6.textContent = `${drink.strMeasure6} ${drink.strIngredient6}`
  directionTitle.textContent = "DIRECTIONS"
  instructions.textContent = drink.strInstructions
  instructions.className = "drink-text"
  ingredientList.className = "padding-1 width-100"

  const ingredients = [ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6]

  for (let i = 0; i < ingredients.length; i++) {
    if (ingredients[i].textContent === "null null") {
      ingredients[i].remove()
    } else {
      ingredients[i].className = "drink-text"
      ingredientList.appendChild(ingredients[i])
    }
  }

  drinkContainer.append(drinkName, drinkImg, ingredientTitle, ingredientList, directionTitle, instructions)
  return drinkContainer
}

const alcoholType = localStorage.getItem("alcoholType")
const alcoholTypeHeading = document.getElementById("alcohol-title")
const drinkRecipeContent = document.querySelector(".recipe-content")
const randomDrinks = []

getDrinkIdsByAlcoholName(alcoholType)

const body = document.querySelector("body")

window.addEventListener("load", function () {
  body.className = "loaded"
})
