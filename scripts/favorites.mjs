document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("favorite-meals");
    const favorites = JSON.parse(localStorage.getItem("favoriteMeals")) || [];

    if (favorites.length === 0) {
        container.innerHTML = `<p>You have no favorite meals.</p>`;
        return;
    }

    favorites.forEach(meal => {
        const card = document.createElement("div");
        card.classList.add("meal");

        card.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <div class="link"><a href="meal.html?id=${meal.idMeal}">View Full Recipe</a></div>
            `;
        
        container.appendChild(card);
    });
})