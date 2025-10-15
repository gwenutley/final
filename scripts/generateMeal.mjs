//getches a random meal to generate it from an API
export async function getRandomMeal() {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await response.json();
        /*extracts json data*/
        const meal = data.meals[0];
        return meal;      
    } catch (error) {
        console.error("Error fetching meal:", error);
        return null;
    }   
}

/*generates ingredients list, returns an array of manes*/
export function createIngredientList(meal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measurement = meal[`strMeasure${i}`];

        if (ingredient) {
            ingredients.push(`${measurement ? measurement : ""} ${ingredient}`.trim());
        }
    }
    return ingredients;
}

/*render everthing, use data from previous json data files,*/
export function displayMealPreview(meal) {
    const mealDiv = document.getElementById("meal-info");

    const ingredients = createIngredientList(meal);

    mealDiv.innerHTML = `
        <div>
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"><br>
            <a href="meal.html?id=${meal.idMeal}">View Full Recipe</a>
        </div>
    `;
    
}

/*request to friholes*/
export async function getMealById(id) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        return data.meals[0];
    } catch (error) {
        console.error("Error fetching meal by ID:", error);
        return null;
    }
}


