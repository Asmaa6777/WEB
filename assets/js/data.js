
const initialRecipes = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    course: "main-course",
    ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Black Pepper", "Salt"],
    image: "carbonara.jpg",
    description: "Silky Roman pasta with crispy pancetta and creamy egg sauce.",
    instructions: [
      "Boil spaghetti in salted water until al dente.",
      "Fry pancetta until crispy in a pan.",
      "Whisk eggs and parmesan together in a bowl.",
      "Drain pasta and mix with pancetta off the heat.",
      "Add egg mixture and toss quickly to coat.",
      "Season with black pepper and serve immediately."
    ]
  },
  {
    id: 2,
    name: "Avocado Toast",
    course: "appetizer",
    ingredients: ["Sourdough Bread", "Avocado", "Lemon", "Chili Flakes", "Olive Oil", "Salt"],
    image: "avocado_toast.jpg",
    description: "Creamy smashed avocado on golden toasted sourdough with a kick of chili.",
    instructions: [
      "Toast sourdough bread until golden and crispy.",
      "Halve the avocado and scoop out the flesh.",
      "Mash avocado with lemon juice and salt.",
      "Spread avocado mixture on the toast.",
      "Drizzle with olive oil and sprinkle chili flakes.",
      "Serve immediately."
    ]
  },
  {
    id: 3,
    name: "Strawberry Cheesecake",
    course: "dessert",
    ingredients: ["Cream Cheese", "Strawberries", "Digestive Biscuits", "Butter", "Sugar", "Vanilla"],
    image: "cheesecake.jpg",
    description: "Velvety cheesecake topped with fresh glossy strawberries.",
    instructions: [
      "Crush digestive biscuits and mix with melted butter.",
      "Press mixture into the base of a springform pan.",
      "Beat cream cheese, sugar and vanilla until smooth.",
      "Pour filling over the biscuit base.",
      "Refrigerate for at least 4 hours until set.",
      "Top with fresh strawberries before serving."
    ]
  },
  {
    id: 4,
    name: "Butter Chicken",
    course: "main-course",
    ingredients: ["Chicken", "Butter", "Tomato Puree", "Heavy Cream", "Garlic", "Garam Masala", "Ginger"],
    image: "butter_chicken.jpg",
    description: "Tender chicken in a rich, velvety tomato and butter sauce.",
    instructions: [
      "Marinate chicken in yogurt and spices for 1 hour.",
      "Grill or pan fry chicken until cooked through.",
      "Sauté garlic and ginger in butter.",
      "Add tomato puree and garam masala, simmer for 10 minutes.",
      "Stir in heavy cream and add the cooked chicken.",
      "Simmer for 5 minutes and serve with rice or naan."
    ]
  },
  {
    id: 5,
    name: "Caprese Salad",
    course: "appetizer",
    ingredients: ["Fresh Mozzarella", "Tomatoes", "Basil", "Olive Oil", "Balsamic Glaze", "Salt"],
    image: "caprese.jpg",
    description: "Fresh mozzarella and ripe tomatoes drizzled with balsamic glaze.",
    instructions: [
      "Slice mozzarella and tomatoes into equal rounds.",
      "Alternate mozzarella and tomato slices on a plate.",
      "Tuck fresh basil leaves between the slices.",
      "Drizzle generously with olive oil.",
      "Add balsamic glaze and a pinch of salt.",
      "Serve immediately at room temperature."
    ]
  },
  {
    id: 6,
    name: "Chocolate Lava Cake",
    course: "dessert",
    ingredients: ["Dark Chocolate", "Butter", "Eggs", "Sugar", "Flour", "Vanilla"],
    image: "lava_cake.jpg",
    description: "Warm chocolate cake with an irresistible molten center.",
    instructions: [
      "Preheat oven to 220°C and grease ramekins.",
      "Melt dark chocolate and butter together.",
      "Whisk eggs, sugar and vanilla until pale.",
      "Fold chocolate mixture into the eggs.",
      "Sift in flour and fold gently.",
      "Pour into ramekins and bake for 12 minutes.",
      "Invert onto a plate and serve immediately."
    ]
  },
  {
    id: 7,
    name: "Salmon Poke Bowl",
    course: "main-course",
    ingredients: ["Salmon", "Sushi Rice", "Avocado", "Cucumber", "Edamame", "Soy Sauce", "Sesame Oil"],
    image: "poke_bowl.jpg",
    description: "Vibrant Hawaiian bowl with fresh salmon, rice and colorful toppings.",
    instructions: [
      "Cook sushi rice and season with rice vinegar.",
      "Dice fresh salmon into cubes and marinate in soy sauce and sesame oil.",
      "Slice avocado and cucumber.",
      "Assemble bowl with rice as the base.",
      "Arrange salmon, avocado, cucumber and edamame on top.",
      "Drizzle with extra soy sauce and sesame oil."
    ]
  },
  {
    id: 8,
    name: "Bruschetta",
    course: "appetizer",
    ingredients: ["Baguette", "Tomatoes", "Basil", "Garlic", "Olive Oil", "Balsamic"],
    image: "bruschetta.jpg",
    description: "Toasted bread topped with juicy tomatoes, fresh basil and garlic.",
    instructions: [
      "Slice baguette diagonally and toast until golden.",
      "Dice tomatoes and mix with chopped basil.",
      "Add olive oil, balsamic and a pinch of salt.",
      "Rub toasted bread with a cut garlic clove.",
      "Spoon tomato mixture onto each slice.",
      "Serve immediately."
    ]
  },
  {
    id: 9,
    name: "Crème Brûlée",
    course: "dessert",
    ingredients: ["Heavy Cream", "Egg Yolks", "Sugar", "Vanilla Bean"],
    image: "creme_brulee.jpg",
    description: "Silky custard topped with a perfectly caramelized sugar crust.",
    instructions: [
      "Preheat oven to 160°C.",
      "Heat heavy cream with vanilla bean until just simmering.",
      "Whisk egg yolks and sugar until pale.",
      "Slowly pour warm cream into egg mixture whisking constantly.",
      "Pour into ramekins and bake in a water bath for 40 minutes.",
      "Refrigerate for 2 hours then sprinkle sugar on top.",
      "Torch the sugar until caramelized and serve."
    ]
  },
  {
    id: 10,
    name: "Beef Tacos",
    course: "main-course",
    ingredients: ["Corn Tortillas", "Ground Beef", "Avocado", "Salsa", "Lime", "Cilantro", "Cheese"],
    image: "tacos.jpg",
    description: "Crispy tacos loaded with spiced beef and fresh colorful toppings.",
    instructions: [
      "Brown ground beef in a pan with taco seasoning.",
      "Warm corn tortillas in a dry pan.",
      "Mash avocado with lime juice and salt.",
      "Fill tortillas with beef, then avocado.",
      "Top with salsa, cheese and fresh cilantro.",
      "Serve with lime wedges."
    ]
  },
  {
    id: 11,
    name: "Shrimp Cocktail",
    course: "appetizer",
    ingredients: ["Shrimp", "Cocktail Sauce", "Lemon", "Horseradish", "Parsley"],
    image: "shrimp_cocktail.jpg",
    description: "Chilled juicy shrimp served with zesty cocktail sauce.",
    instructions: [
      "Boil shrimp in salted water for 2-3 minutes until pink.",
      "Transfer immediately to ice water to stop cooking.",
      "Mix ketchup, horseradish and lemon juice for the sauce.",
      "Arrange chilled shrimp around the edge of a glass.",
      "Place cocktail sauce in the center.",
      "Garnish with parsley and lemon wedges."
    ]
  },
  {
    id: 12,
    name: "Tiramisu",
    course: "dessert",
    ingredients: ["Ladyfinger Biscuits", "Mascarpone", "Espresso", "Eggs", "Sugar", "Cocoa Powder"],
    image: "tiramisu.jpg",
    description: "Layers of coffee soaked biscuits and cloud-like mascarpone cream.",
    instructions: [
      "Brew espresso and let it cool.",
      "Whisk egg yolks and sugar until pale and creamy.",
      "Fold mascarpone into the egg mixture.",
      "Whip egg whites to stiff peaks and fold into the cream.",
      "Dip ladyfingers briefly in espresso and layer in a dish.",
      "Spread mascarpone cream over the biscuits.",
      "Repeat layers and dust with cocoa powder.",
      "Refrigerate for at least 4 hours before serving."
    ]
  },
  {
    id: 13,
    name: "Margherita Pizza",
    course: "main-course",
    ingredients: ["Pizza Dough", "Tomato Sauce", "Fresh Mozzarella", "Basil", "Olive Oil"],
    image: "pizza.jpg",
    description: "Classic Neapolitan pizza with bubbling mozzarella and fresh basil.",
    instructions: [
      "Preheat oven to its highest setting with a pizza stone inside.",
      "Stretch pizza dough into a thin round.",
      "Spread tomato sauce leaving a border for the crust.",
      "Tear mozzarella and scatter over the sauce.",
      "Drizzle with olive oil.",
      "Bake for 8-10 minutes until crust is golden.",
      "Top with fresh basil leaves and serve immediately."
    ]
  },
  {
    id: 14,
    name: "Stuffed Mushrooms",
    course: "appetizer",
    ingredients: ["Portobello Mushrooms", "Cream Cheese", "Garlic", "Parmesan", "Parsley", "Breadcrumbs"],
    image: "stuffed_mushrooms.jpg",
    description: "Golden baked mushrooms filled with creamy garlic and cheese stuffing.",
    instructions: [
      "Preheat oven to 190°C.",
      "Remove mushroom stems and finely chop them.",
      "Sauté chopped stems with garlic in butter.",
      "Mix with cream cheese, parmesan and parsley.",
      "Fill each mushroom cap with the mixture.",
      "Top with breadcrumbs and bake for 20 minutes until golden."
    ]
  },
  {
    id: 15,
    name: "Mango Mousse",
    course: "dessert",
    ingredients: ["Mango Puree", "Heavy Cream", "Sugar", "Gelatin", "Lime Juice"],
    image: "mango_mousse.jpg",
    description: "Light and airy tropical mousse bursting with fresh mango flavor.",
    instructions: [
      "Bloom gelatin in cold water for 5 minutes.",
      "Warm mango puree and dissolve gelatin into it.",
      "Add sugar and lime juice to the mango mixture.",
      "Whip heavy cream to soft peaks.",
      "Fold whipped cream into the cooled mango mixture.",
      "Pour into glasses and refrigerate for 3 hours before serving."
    ]
  },
  {
    id: 16,
    name: "Grilled Salmon",
    course: "main-course",
    ingredients: ["Salmon Fillet", "Lemon", "Garlic", "Dill", "Olive Oil", "Capers"],
    image: "salmon.jpg",
    description: "Perfectly seared salmon with golden skin and fresh herb butter.",
    instructions: [
      "Pat salmon fillets dry with paper towels.",
      "Season with salt, pepper and minced garlic.",
      "Heat olive oil in a pan over high heat.",
      "Place salmon skin side down and cook for 4 minutes.",
      "Flip and cook for another 2 minutes.",
      "Finish with lemon juice, dill and capers."
    ]
  },
  {
    id: 17,
    name: "Burrata with Tomatoes",
    course: "appetizer",
    ingredients: ["Burrata", "Heirloom Tomatoes", "Basil", "Olive Oil", "Sea Salt", "Black Pepper"],
    image: "burrata.jpg",
    description: "Creamy burrata on a bed of colorful heirloom tomatoes.",
    instructions: [
      "Slice heirloom tomatoes into thick rounds.",
      "Arrange on a plate and season with salt and pepper.",
      "Place burrata in the center of the tomatoes.",
      "Scatter fresh basil leaves around.",
      "Drizzle generously with good quality olive oil.",
      "Serve immediately with crusty bread."
    ]
  },
  {
    id: 18,
    name: "French Macarons",
    course: "dessert",
    ingredients: ["Almond Flour", "Egg Whites", "Powdered Sugar", "Buttercream", "Food Coloring"],
    image: "macarons.jpg",
    description: "Delicate pastel shells with silky buttercream filling.",
    instructions: [
      "Sift almond flour and powdered sugar together.",
      "Whip egg whites to stiff peaks adding sugar gradually.",
      "Fold dry ingredients into egg whites until batter flows like lava.",
      "Pipe small circles onto a baking sheet.",
      "Let rest for 30 minutes until a skin forms.",
      "Bake at 150°C for 14 minutes.",
      "Fill with buttercream once completely cooled."
    ]
  },
  {
    id: 19,
    name: "Ramen",
    course: "main-course",
    ingredients: ["Ramen Noodles", "Soft Boiled Egg", "Pork Belly", "Broth", "Nori", "Spring Onion", "Corn"],
    image: "ramen.jpg",
    description: "A rich steaming bowl of Japanese ramen with all the toppings.",
    instructions: [
      "Simmer broth with soy sauce and mirin for 20 minutes.",
      "Slow cook pork belly until tender then slice.",
      "Soft boil eggs for 6.5 minutes then marinate in soy sauce.",
      "Cook ramen noodles according to package instructions.",
      "Place noodles in a bowl and pour hot broth over.",
      "Top with pork belly, halved egg, nori, corn and spring onion."
    ]
  },
  {
    id: 20,
    name: "Acai Bowl",
    course: "appetizer",
    ingredients: ["Acai", "Banana", "Granola", "Fresh Berries", "Honey", "Coconut Flakes"],
    image: "acai_bowl.jpg",
    description: "A vibrant purple bowl topped with fresh fruit and crunchy granola.",
    instructions: [
      "Blend frozen acai with banana until thick and smooth.",
      "Pour into a bowl.",
      "Top with granola, fresh berries and coconut flakes.",
      "Drizzle with honey.",
      "Serve immediately while still cold."
    ]
  }
];

const initialUsers = [
  { id: 1, name: "Admin", email: "admin@recipes.com", password: "admin123", role: "admin" },
  { id: 2, name: "User", email: "user@recipes.com", password: "user123", role: "user" }
];

if (!localStorage.getItem('recipes')) {
  localStorage.setItem('recipes', JSON.stringify(initialRecipes));
}

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(initialUsers));
}



function getRecipes() {
  return JSON.parse(localStorage.getItem('recipes')) || [];
}

function saveRecipes(recipes) {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

function getFavourites() {
  return JSON.parse(localStorage.getItem('favourites')) || [];
}

function saveFavourites(favourites) {
  localStorage.setItem('favourites', JSON.stringify(favourites));
}

function getRecipeViews() {
  return JSON.parse(localStorage.getItem('recipeViews')) || {};
}

function getFavouriteCounts() {
  return JSON.parse(localStorage.getItem('favoriteCounts')) || {};
}

function generateId() {
  const recipes = getRecipes();
  if (recipes.length === 0) return 1;
  return Math.max(...recipes.map(r => r.id)) + 1;
}
