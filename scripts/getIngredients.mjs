
export function createIngredientListOnly(meal) {
    //create a list of ingredients without measurements

    const ingredientsOnly = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]?.trim();

        if (ingredient) {
            ingredientsOnly.push(ingredient);
        }

    }
    return ingredientsOnly;
}

const API_KEY = "9978c2da-5c66-4545-9099-19a0509c66f8";

export async function getPrices(store = "Walmart", productName, currency = "usd") {
    const url = `https://openpricengine.com/api/v1/${store}/products/prices/today?productname=${encodeURIComponent(productName)}&currency=${currency}`;

    const response = await fetch(url, {
        headers: {
            "Authorization": API_KEY,
            "Accept": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
        throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
}



export async function getIngredientPrices(store, ingredients) {
    const results = [];

    for (const ingredient of ingredients) {
        try {
            const data = await getPrices(store, ingredient);

            const displayPrice = data?.price
                ? `$${parseFloat(data.price).toFixed(2)}`
                : `Not found (${data?.product || "no product"})`;
            
            results.push({ ingredient, price: displayPrice });
        } catch (error) {
            results.push({ ingredient, price: "Item not found" });
        }
    }
    return results;
}
/*
export function getListWithPrices(meal) {
    const ingredients = createIngredientListOnly(meal);
    const store = "Walmart";

    getIngredientPrices(store, ingredients).then(prices => {
        const container = document.getElementById("ingredient-prices");

        if (!container) return;

        container.innerHTML = prices.map(item => {
            return `<p><strong>${item.original}</strong>: ${item.price}</p>`;
        }).join("");
    });
}
    */