document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("recipes-container");

    if (typeof recipes !== 'undefined' && recipes.length > 0) {
        let cardsHTML = ""; 

        recipes.forEach(recipe => {
            cardsHTML += `
                <div class="card">
                    <p class="course-label">${recipe.course}</p>
                    <img src="${recipe.image}" alt="${recipe.name}">
                    <div class="card-content">
                        <h3>${recipe.name}</h3>
                        <p>${recipe.description}</p>
                        
                    </div>
                </div>
            `;
        });

        container.innerHTML = cardsHTML;
    } else {
        console.error("المصفوفة مش موجودة أو فاضية! اتأكدي من تعريف const recipes في ملف data.js");
    }
});