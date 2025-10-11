//generate three random meals from the API to display on website home page
import { getRandomMeal, createIngredientList } from "./generateMeal.mjs";

export async function makeMealCards() {
    const cardContainer = document.querySelector(".meal-card");
    cardContainer.innerHTML = "";
    
    for (let i = 1; i <= 3; i++) {
        try {
            const meal = await getRandomMeal();
            const ingredients = createIngredientList(meal);

            const card = document.createElement("div");
            card.classList.add("meal");
            card.id = `meal-card-${i}`;

            card.innerHTML = `
                <h3>${meal.strMeal}</h3>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <p><strong>Instructions:</strong> ${shortenText(meal.strInstructions, 50)}</p>
                <h4>Ingredients:</h4>
                <ul>
                    ${shortenText(ingredients.map(item => `<li>${item}</li>`).join(""), 25)}
                </ul>
            `;

            cardContainer.appendChild(card);
        } catch (error) {
            console.error(`Failed to load meal ${i}`, error);
        }
    }
}

function shortenText(text, wordLimit = 50) {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + ". . .";
}