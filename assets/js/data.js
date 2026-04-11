// js/data.js

const recipes = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    course: "main-course",
    ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Black Pepper", "Salt"],
    image: "/WEB/assets/images/carbonara.jpg",
    description: "Silky Roman pasta with crispy pancetta and creamy egg sauce."
  },
  {
    id: 2,
    name: "Avocado Toast",
    course: "appetizer",
    ingredients: ["Sourdough Bread", "Avocado", "Lemon", "Chili Flakes", "Olive Oil", "Salt"],
    image: "/WEB/assets/images/avocado_toast.jpg",
    description: "Creamy smashed avocado on golden toasted sourdough with a kick of chili."
  },
  {
    id: 3,
    name: "Strawberry Cheesecake",
    course: "dessert",
    ingredients: ["Cream Cheese", "Strawberries", "Digestive Biscuits", "Butter", "Sugar", "Vanilla"],
    image: "/WEB/assets/images/cheesecake.jpg",
    description: "Velvety cheesecake topped with fresh glossy strawberries."
  },
  {
    id: 4,
    name: "Butter Chicken",
    course: "main-course",
    ingredients: ["Chicken", "Butter", "Tomato Puree", "Heavy Cream", "Garlic", "Garam Masala", "Ginger"],
    image: "/WEB/assets/images/butter_chicken.jpg",
    description: "Tender chicken in a rich, velvety tomato and butter sauce."
  },
  {
    id: 5,
    name: "Caprese Salad",
    course: "appetizer",
    ingredients: ["Fresh Mozzarella", "Tomatoes", "Basil", "Olive Oil", "Balsamic Glaze", "Salt"],
    image: "/WEB/assets/images/caprese.jpg",
    description: "Fresh mozzarella and ripe tomatoes drizzled with balsamic glaze."
  },
  {
    id: 6,
    name: "Chocolate Lava Cake",
    course: "dessert",
    ingredients: ["Dark Chocolate", "Butter", "Eggs", "Sugar", "Flour", "Vanilla"],
    image: "/WEB/assets/images/lava_cake.jpg",
    description: "Warm chocolate cake with an irresistible molten center."
  },
  {
    id: 7,
    name: "Salmon Poke Bowl",
    course: "main-course",
    ingredients: ["Salmon", "Sushi Rice", "Avocado", "Cucumber", "Edamame", "Soy Sauce", "Sesame Oil"],
    image: "/WEB/assets/images/poke_bowl.jpg",
    description: "Vibrant Hawaiian bowl with fresh salmon, rice and colorful toppings."
  },
  {
    id: 8,
    name: "Bruschetta",
    course: "appetizer",
    ingredients: ["Baguette", "Tomatoes", "Basil", "Garlic", "Olive Oil", "Balsamic"],
    image: "/WEB/assets/images/bruschetta.jpg",
    description: "Toasted bread topped with juicy tomatoes, fresh basil and garlic."
  },
  {
    id: 9,
    name: "Crème Brûlée",
    course: "dessert",
    ingredients: ["Heavy Cream", "Egg Yolks", "Sugar", "Vanilla Bean"],
    image: "/WEB/assets/images/creme_brulee.jpg",
    description: "Silky custard topped with a perfectly caramelized sugar crust."
  },
  {
    id: 10,
    name: "Beef Tacos",
    course: "main-course",
    ingredients: ["Corn Tortillas", "Ground Beef", "Avocado", "Salsa", "Lime", "Cilantro", "Cheese"],
    image: "/WEB/assets/images/tacos.jpg",
    description: "Crispy tacos loaded with spiced beef and fresh colorful toppings."
  },
  {
    id: 11,
    name: "Shrimp Cocktail",
    course: "appetizer",
    ingredients: ["Shrimp", "Cocktail Sauce", "Lemon", "Horseradish", "Parsley"],
    image: "/WEB/assets/images/shrimp_cocktail.jpg",
    description: "Chilled juicy shrimp served with zesty cocktail sauce."
  },
  {
    id: 12,
    name: "Tiramisu",
    course: "dessert",
    ingredients: ["Ladyfinger Biscuits", "Mascarpone", "Espresso", "Eggs", "Sugar", "Cocoa Powder"],
    image: "/WEB/assets/images/tiramisu.jpg",
    description: "Layers of coffee soaked biscuits and cloud-like mascarpone cream."
  },
  {
    id: 13,
    name: "Margherita Pizza",
    course: "main-course",
    ingredients: ["Pizza Dough", "Tomato Sauce", "Fresh Mozzarella", "Basil", "Olive Oil"],
    image: "/WEB/assets/images/pizza.jpg",
    description: "Classic Neapolitan pizza with bubbling mozzarella and fresh basil."
  },
  {
    id: 14,
    name: "Stuffed Mushrooms",
    course: "appetizer",
    ingredients: ["Portobello Mushrooms", "Cream Cheese", "Garlic", "Parmesan", "Parsley", "Breadcrumbs"],
    image: "/WEB/assets/images/stuffed_mushrooms.jpg",
    description: "Golden baked mushrooms filled with creamy garlic and cheese stuffing."
  },
  {
    id: 15,
    name: "Mango Mousse",
    course: "dessert",
    ingredients: ["Mango Puree", "Heavy Cream", "Sugar", "Gelatin", "Lime Juice"],
    image: "/WEB/assets/images/mango_mousse.jpg",
    description: "Light and airy tropical mousse bursting with fresh mango flavor."
  },
  {
    id: 16,
    name: "Grilled Salmon",
    course: "main-course",
    ingredients: ["Salmon Fillet", "Lemon", "Garlic", "Dill", "Olive Oil", "Capers"],
    image: "/WEB/assets/images/salmon.jpg",
    description: "Perfectly seared salmon with golden skin and fresh herb butter."
  },
  {
    id: 17,
    name: "Burrata with Tomatoes",
    course: "appetizer",
    ingredients: ["Burrata", "Heirloom Tomatoes", "Basil", "Olive Oil", "Sea Salt", "Black Pepper"],
    image: "/WEB/assets/images/burrata.jpg",
    description: "Creamy burrata on a bed of colorful heirloom tomatoes."
  },
  {
    id: 18,
    name: "French Macarons",
    course: "dessert",
    ingredients: ["Almond Flour", "Egg Whites", "Powdered Sugar", "Buttercream", "Food Coloring"],
    image: "/WEB/assets/images/macarons.jpg",
    description: "Delicate pastel shells with silky buttercream filling."
  },
  {
    id: 19,
    name: "Ramen",
    course: "main-course",
    ingredients: ["Ramen Noodles", "Soft Boiled Egg", "Pork Belly", "Broth", "Nori", "Spring Onion", "Corn"],
    image: "/WEB/assets/images/ramen.jpg",
    description: "A rich steaming bowl of Japanese ramen with all the toppings."
  },
  {
    id: 20,
    name: "Acai Bowl",
    course: "appetizer",
    ingredients: ["Acai", "Banana", "Granola", "Fresh Berries", "Honey", "Coconut Flakes"],
    image: "/WEB/assets/images/acai_bowl.jpg",
    description: "A vibrant purple bowl topped with fresh fruit and crunchy granola."
  }
];

const users = [
  { id: 1, name: "Admin", email: "admin@recipes.com", password: "admin123", role: "admin" },
  { id: 2, name: "Sara", email: "sara@recipes.com", password: "sara123", role: "user" }
];

let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
let recipeViews = JSON.parse(localStorage.getItem('recipeViews')) || {};
let favoriteCounts = JSON.parse(localStorage.getItem('favoriteCounts')) || {};