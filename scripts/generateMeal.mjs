//generate a new meal from API
export async function getRandomMeal() {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await response.json();
        const meal = data.meals[0];
        return meal;      
    } catch (error) {
        console.error("Error fetching meal:", error);
        return null;
    }   
}

export function createIngredientList(meal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measurement = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
            ingredients.push(`${measurement ? measurement : ""} ${ingredient}`.trim());
        }
    }
    return ingredients;
}

export function displayMeal(meal) {
    const mealDiv = document.getElementById("meal-info");

    const ingredients = createIngredientList(meal);

    mealDiv.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="500">
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients.map(item => `<li>${item}</li>`).join("")}
        </ul>
    `;
    
}


