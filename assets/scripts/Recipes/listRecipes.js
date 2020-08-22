function getDrinkIdsByAlcoholName(valueName) {
  $.ajax({
    method: "GET",
    url: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${valueName}`,
    success: (data) => {
      console.log(data.drinks)
      const drinkIds = selectRandomDrinkIds(data.drinks)
      console.log(drinkIds)
    },
    error: (error) => {
      console.error(error)
    }
  })
}

// function useRandomNumToGetDrinkRecipes() {
//   const listOfDrinksByAlcoholType = getDrinkIdsByAlcoholName(alcoholType)
//   for (let i = 0; i < 5; i++) {
//     const randomNum = Math.floor(Math.random() * data.drinks.length)
//     const randomId = parseInt(data.drinks[randomNum].idDrink)
//     getDrinkInfo(randomId)
//   }
// }

function selectRandomDrinkIds(drinks) {
  const randomDrinkIds = []
  for (let i = 0; i < 8; i++) {
    const randomNum = Math.floor(Math.random() * drinks.length)
    const randomDrinkIdFromList = parseInt(drinks[randomNum].idDrink)
    randomDrinkIds.push(randomDrinkIdFromList)
  }
  return randomDrinkIds
}

function getDrinkInfo(id) {
  $.ajax({
    method: "GET",
    url: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    success: (data) => {
      randomDrinks.push(data.drinks[0])
      displayDrinks(randomDrinks)
    },
    error: (error) => {
      console.error(error)
    }
  })
}

function displayDrinks(arr) {
  if (arr.length === 5) {
    for (let i = 0; i < arr.length; i++) {
      const li = document.createElement("li")
      const drinkName = document.createElement("h2")
      const drinkImg = document.createElement("img")
      const ingredientList = document.createElement("ul")
      const ingredient1 = document.createElement("li")
      const ingredient2 = document.createElement("li")
      const ingredient3 = document.createElement("li")
      const ingredient4 = document.createElement("li")
      const ingredient5 = document.createElement("li")
      const ingredient6 = document.createElement("li")
      const instructions = document.createElement("p")
      drinkName.textContent = arr[i].strDrink
      drinkName.className = "padding-1"
      drinkImg.setAttribute("src", arr[i].strDrinkThumb)
      drinkImg.className = "img-size padding-1"
      ingredient1.textContent = arr[i].strIngredient1
      ingredient2.textContent = arr[i].strIngredient2
      ingredient3.textContent = arr[i].strIngredient3
      ingredient4.textContent = arr[i].strIngredient4
      ingredient5.textContent = arr[i].strIngredient5
      ingredient6.textContent = arr[i].strIngredient6
      instructions.textContent = arr[i].strInstructions
      instructions.className = "padding-1"
      ingredientList.className = "padding-1"

      ingredientList.append(ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6)
      recipeContent.append(drinkName, drinkImg, ingredientList, instructions)
    }
  }
}


const alcoholType = localStorage.getItem("alcoholType")
const alcoholTypeHeading = document.getElementById("alcohol-title")
const recipeContent = document.querySelector(".recipe-content")
const randomDrinks = []

getDrinkIdsByAlcoholName(alcoholType)
