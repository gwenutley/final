//displays the full meal deatails in a new page
import { getMealById, createIngredientList } from "./generateMeal.mjs";
import { getIngredientPrices, createIngredientListOnly } from "./getIngredients.mjs";

//get the meal id fron the url 
function getMealIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

export async function loadMealDetails() {
    const mealId = getMealIdFromURL();
    const mealContainer = document.getElementById("meal-details");

    if (!mealId || !mealContainer) {
        mealContainer.innerHTML = `<p>No meal found</p>`;
        return;
    }

    const meal = await getMealById(mealId);
    if (!meal) {
        mealContainer.innerHTML = `<p>Couldn't load meal information.</p>`;
        return;
    }

    //get the ingredients with measurememnts
    const ingredients = createIngredientList(meal);
    
    //get ingredients only and with measurements
    const ingredientNames = createIngredientListOnly(meal);
    const prices = await getIngredientPrices("Walmart", ingredientNames);

    //output to display to the screen
    mealContainer.innerHTML = `
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients.map(item => `<li>${item}</li>`).join("")}
        </ul>
        <button id="save-favorite">Save to Favorites</button>
        <a href="index.html">Back to Home</a>
    `;

    //take the user input and display prices of list items from the API
    const priceButton = document.getElementById("get-prices");
    priceButton?.addEventListener("click", async () => {
        const storeName = document.getElementById("store-input")?.value?.trim();
        const prices = await getIngredientPrices(storeName, ingredientNames);
        const priceList = document.getElementById("ingredient-prices");
        priceList.innerHTML = prices.map(item => {
            return `<li>${item.ingredient}: <strong>${item.price}</strong></li>`;

        }).join("");
    });

    function saveMealToFavorites(meal) {
        const favorites = JSON.parse(localStorage.getItem("favoriteMeals")) || [];

        const replica = favorites.some(favorite => favorite.idMeal === meal.idMeal);
        if (!replica) {
            favorites.push(meal);
            localStorage.setItem("favoriteMeals", JSON.stringify(favorites));
            alert("Successfully Saved!");

        } else {
            alert("This meal was already saved.")
        }
    }

    //event allowing to save meals to the local storage
    document.getElementById("save-favorite").addEventListener("click", () => {
        saveMealToFavorites(meal);
    });


}


