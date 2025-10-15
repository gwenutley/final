import { getRandomMeal, displayMealPreview } from "./generateMeal.mjs";
import { makeMealCards } from "./makeMealCards.mjs";
import { loadMealDetails } from "./meal.mjs";

const newMealButton = document.getElementById("generate-meal");

/*run the random meal generator on the homepage 
using a click event and fetching an API*/
if (newMealButton) {
    newMealButton.addEventListener("click", async () => {
        const meal = await getRandomMeal();
        if (meal) displayMealPreview(meal);
    });

    //calls the function to make meal cards
    makeMealCards();
}

/*this will load and display meal details in its container
but only if the container exists*/
const mealDetailsContainer = document.getElementById("meal-details");
if (mealDetailsContainer) {
    loadMealDetails();
}


//event when clicked it opens the favorites page
const favoritesButton = document.getElementById("favorites");
favoritesButton?.addEventListener("click", () => {
    window.location.href = "favorites.html";
});

