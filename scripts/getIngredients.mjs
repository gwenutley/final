import { createIngredientList } from "./generateMeal.mjs";

async function getTheMealNutrition(mealName, ingredients) {
    try {
        const mealNutrition = await findMealNutrition(mealName);
        if (mealNutrition) {
            return mealNutrition;
        }
    } catch (error) {
        console.warn("meal doesn't exist, now checking ingredients nutrition");

    }

    return await getIngredientNutrition(ingredients)
}

export async function findMealNutrition(mealName) {
    const apiKey = "fa83af7cfdf94b7daa839893ba648d0e";
    const url = `https://api.spoonacular.com/recipes/guessNutrition?title=${encodeURIComponent(mealName)}&apiKey=${apiKey}`
   
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to get info");
    }

    const data = await response.json();

    if (!data || !data.calories || !data.fat || !data.protein) {
        return null;
    }

    return {
        calories: `${data.calories.value} ${data.calories.unit}`,
        fat: `${data.fat.value} ${data.fat.unit}`,
        protein: `${data.protein.value} ${data.protein.unit}`,
    };
}

export async function getIngredientNutrition(ingredients) {
    const apiKey = "fa83af7cfdf94b7daa839893ba648d0e";
    
    const promises = ingredients.map(async (ingredient) => {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/parseIngredients?apiKey=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify([ingredient]),
            }
        );

        if (!response.ok) {
            console.warn(`Failes to parse: ${ingredient}`);
            return null;
        }

        const data = await response.json();
        return data[0]?.nutrition ?? null;
    });

    const nutritionData = await Promise.all(promises);

    let total = { calories: 0, fat: 0, protein: 0 };

    for (const item of nutritionData) {
        if (item) {
            const calories = item.nutrients.find(item => item.name === "Calories")?.amount || 0;
            const fat = item.nutrients.find(item => item.name === "Fat")?.amount || 0;
            const protein = item.nutrients.find(item => item.name === "Protein")?.amount || 0;

            total.calories += calories;
            total.fat += fat;
            total.protein += protein;
        }
    }

    return {
        calories: `${total.calories.toFixed(1)} kcal`,
        fat: `${total.fat.toFixed(1)} g`,
        protein: `${total.protein.toFixed(1)} g`,
    };

}

export async function getMealNutrition(meal, ingredientList) {
    try {
        const mealNutrition = await findMealNutrition(meal.strMeal);
        if (mealNutrition) {
            return mealNutrition;
        }

    } catch (error) {
        console.warn("Failed to get info", error.message);
    }

    return await getIngredientNutrition(ingredientList);
}



export function showNutritionForMeal(meal) {
    const ingredients = createIngredientList(meal);
    const container = document.getElementById("ingredient-nutrition");

    if (!container) return;

    getMealNutrition(meal, ingredients).then(nutrition => {
        container.innerHTML = `
            <h3>Estimated Nutrition:</h3>
                <p>Calories: ${nutrition.calories}</p>
                <p>Fat: ${nutrition.fat}</p>
                <p>Protein: ${nutrition.protein}</p>`;
        
    }).catch(error => {
        container.innerHTML = `<p>couldn't load nutrition info</p>`
        console.error("Failed to fetch info:", error);
    });
}



