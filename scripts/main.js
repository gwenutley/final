import { getRandomMeal, displayMealPreview } from "./generateMeal.mjs";
import { makeMealCards } from "./makeMealCards.mjs";
import { loadMealDetails } from "./meal.mjs";

const newMealButton = document.getElementById("generate-meal");

//run the random meal generator on the homepage
if (newMealButton) {
    newMealButton.addEventListener("click", async () => {
        const meal = await getRandomMeal();
        if (meal) displayMealPreview(meal);
    });

    makeMealCards();
}

//create the random meal details on a new page
const mealDetailsContainer = document.getElementById("meal-details");
if (mealDetailsContainer) {
    loadMealDetails();
}


//event to open the favorites page
const favoritesButton = document.getElementById("favorites");

favoritesButton?.addEventListener("click", () => {
    window.location.href = "favorites.html";
});

