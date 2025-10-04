import { getRandomMeal, displayMeal } from "./generateMeal.mjs";
import { makeMealCards } from "./makeMealCards.mjs";

const newMealButton = document.getElementById("generate-meal");

newMealButton.addEventListener("click", async () => {
    const meal = await getRandomMeal();
    if (meal) displayMeal(meal);
});

makeMealCards();