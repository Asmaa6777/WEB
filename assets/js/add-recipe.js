// add-recipe.js

document.addEventListener('DOMContentLoaded', function() {

// ===== VALIDATION FUNCTIONS =====

function validateRecipeName(name) {
  if (name.trim() === "") {
    return { valid: false, message: "Recipe name cannot be empty" };
  }
  if (name.length < 3) {
    return { valid: false, message: "Recipe name must be at least 3 characters" };
  }
  return { valid: true };
}

function validateDescription(description) {
  if (description.trim() === "") {
    return { valid: false, message: "Description cannot be empty" };
  }
  return { valid: true };
}

function validatePrepTime(prepTime) {
  if (prepTime === "" || prepTime < 1) {
    return { valid: false, message: "Prep time must be at least 1 minute" };
  }
  return { valid: true };
}

function validateCookTime(cookTime) {
  if (cookTime === "" || cookTime < 1) {
    return { valid: false, message: "Cook time must be at least 1 minute" };
  }
  return { valid: true };
}

// ===== ADD INGREDIENT ROW =====

document.getElementById('addIngredientBtn').addEventListener('click', function() {
  const table = document.getElementById('ingredientsTable');
  const newRow = table.insertRow();
  newRow.innerHTML = `
    <td><input type="text" name="ingredientName" placeholder="e.g. Flour" /></td>
    <td><input type="number" name="quantity" placeholder="e.g. 2" min="0" /></td>
    <td>
      <select name="unit">
        <option value="">-- Select Unit --</option>
        <option value="cups">Cups</option>
        <option value="grams">Grams</option>
        <option value="tbsp">Tbsp</option>
        <option value="tsp">Tsp</option>
        <option value="ml">ML</option>
        <option value="kg">KG</option>
        <option value="pieces">Pieces</option>
      </select>
    </td>
    <td><button type="button" onclick="this.closest('tr').remove()">❌</button></td>
  `;
});

// ===== FORM HANDLING =====

document.getElementById('recipeForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const recipeName = document.getElementById('recipeName').value;
  const description = document.getElementById('description').value;
  const prepTime = document.getElementById('prepTime').value;
  const cookTime = document.getElementById('cookTime').value;

  const nameCheck = validateRecipeName(recipeName);
  if (!nameCheck.valid) { alert(nameCheck.message); return; }

  const descCheck = validateDescription(description);
  if (!descCheck.valid) { alert(descCheck.message); return; }

  const prepCheck = validatePrepTime(prepTime);
  if (!prepCheck.valid) { alert(prepCheck.message); return; }

  const cookCheck = validateCookTime(cookTime);
  if (!cookCheck.valid) { alert(cookCheck.message); return; }

  // ===== COLLECT ALL INGREDIENTS =====
  const ingredients = [];
  const names = document.querySelectorAll('[name="ingredientName"]');
  const quantities = document.querySelectorAll('[name="quantity"]');
  const units = document.querySelectorAll('[name="unit"]');

  names.forEach((nameInput, index) => {
    if (nameInput.value.trim() !== "") {
      ingredients.push({
        name: nameInput.value,
        quantity: quantities[index].value,
        unit: units[index].value
      });
    }
  });

  const newRecipe = {
    id: Date.now(),
    name: recipeName,
    description: description,
    prepTime: prepTime,
    cookTime: cookTime,
    ingredients: ingredients
  };

  const existingRecipes = JSON.parse(localStorage.getItem('recipes')) || recipe;
  existingRecipes.push(newRecipe);
  localStorage.setItem('recipes', JSON.stringify(existingRecipes));

  alert("✅ Recipe saved successfully!");
  this.reset();
});

}); // ===== END DOMContentLoaded =====