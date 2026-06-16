// ========================================
// 1. DOM ELEMENTS SELECTION
// ========================================

// --- Action Buttons ---
const tryAnotherRecipeButton = document.querySelector(
  ".btn-try-another-recipe"
);

// --- Image Section ---
const recipeImageSection = document.querySelector(".recipe-image-section");
let currentRecipeImageUrl =
  getComputedStyle(recipeImageSection).backgroundImage;

// --- Rating Section ---
const ratingElements = {
  value: document.querySelector(".rating-value"),
  count: document.querySelector(".rating-count"),
};

// --- Time & Servings Section ---
const timeServingsElements = {
  prepTime: document.querySelector(".prep-value"),
  cookTime: document.querySelector(".cook-value"),
  servings: document.querySelector(".servings-value"),
};

// --- Tags Section ---
const tagElements = {
  difficulty: document.querySelector(".tag-difficulty"),
  cuisine: document.querySelector(".tag-cuisine"),
};

// --- Recipe Header ---
const recipeHeaderElements = {
  title: document.querySelector(".recipe-title"),
  description: document.querySelector(".recipe-desc"),
};

// --- Alert ----
const alertElement = document.querySelector(".alert");

// --- Recipe Content Lists ---
const recipeListElements = {
  ingredients: document.querySelector(".ingredients-list"),
  instructions: document.querySelector(".instruction-list"),
};

// --- Nutrition Facts ---
const nutritionElements = {
  calories: document.querySelector(".calories-value"),
  carbohydrates: document.querySelector(".carbohydrates-value"),
  fiber: document.querySelector(".fiber-value"),
  protein: document.querySelector(".protein-value"),
  fat: document.querySelector(".fat-value"),
  sodium: document.querySelector(".sodium-value"),
};

// --- Chef's Tips Section ---
const chefTipsSection = document.querySelector("#pills-chef-tips");

// ========================================
// 2. RECIPE DATA OBJECTS
// ========================================

const recipeData1 = {
  // === Basic Information ===
  recipeId: "recipe-002",
  recipeImageUrl: "../Images/meal_01.jpg",

  // === Header ===
  header: {
    title: "Honey Garlic Salmon",
    description: "Pan-seared salmon with a sweet and savory glaze",
  },

  // === Rating & Reviews ===
  averageRating: {
    value: 4.9,
    displayText: "4.8",
  },
  totalReviewCount: {
    count: 187,
    displayText: "(445 reviews)",
  },

  // === Classification ===
 difficultyLevel: {
    level: "Easy",
    displayText: "Easy",
  },
  cuisineType: {
    type: "seafood",
    displayText: "seafood",
  },
  recipeCategory: {
    category: "Main Course",
    displayText: "Main Course",
  },

  // === Time & Servings ===
  preparationTime: {
    totalMinutes: 10,
    displayText: "10 min",
  },
  cookingTime: {
    totalMinutes: 5,
    displayText: "5 min",
  },
  totalCookTime: {
    totalMinutes: 110,
    displayText: "1 hr 50 min",
  },
  servingInfo: {
    servingCount: 2,
    displayText: "2 people",
  },

  // === Ingredients ===
  ingredientsList: [
    {
      ingredientId: 1,
      ingredientText: "2 salmon fillets (6oz each)",
      ingredientQuantity: "2",
      measurementUnit: "large",
      ingredientName: "eggplants",
    },
    {
      ingredientId: 2,
      ingredientText: "3 tablespoons honey",
      ingredientQuantity: "500",
      measurementUnit: "g",
      ingredientName: "ground lamb",
    },
    {
      ingredientId: 3,
      ingredientText: "2 tablespoons soy sauce ",
      ingredientQuantity: "2",
      measurementUnit: "large",
      ingredientName: "eggplants",
    },
    {
      ingredientId: 4,
      ingredientText: "4 cloves garlic, minced ",
      ingredientQuantity: "2",
      measurementUnit: "large",
      ingredientName: "eggplants",
    },
    {
      ingredientId: 5,
      ingredientText: "1 tablespoon olive oil",
      ingredientQuantity: "500",
      measurementUnit: "g",
      ingredientName: "ground lamb",
    },
    {
      ingredientId: 6,
      ingredientText: "1 teaspoon fresh ginger, grated",
      ingredientQuantity: "2",
      measurementUnit: "large",
      ingredientName: "eggplants",
    },
    {
      ingredientId: 7,
      ingredientText: "Sesame seeds for garnish",
      ingredientQuantity: "500",
      measurementUnit: "g",
      ingredientName: "ground lamb",
    },
    {
      ingredientId: 8,
      ingredientText: "Green onions, sliced",
      ingredientQuantity: "2",
      measurementUnit: "large",
      ingredientName: "eggplants",
    },
  ],

  // === Instructions ===
  cookingInstructions: [
    {
      instructionStep: 1,
      instructionText:
        "Pat salmon fillets dry with paper towels. Season with salt and pepper.",
      stepDurationMinutes: 30,
    },
    {
      instructionStep: 2,
      instructionText:
        "In a small bowl, whisk together honey, soy sauce, minced garlic, and grated ginger.",
      stepDurationMinutes: 10,
    },
    {
      instructionStep: 3,
      instructionText:
        "Heat olive oil in a large skillet over medium-high heat.",
      stepDurationMinutes: 30,
    },
    {
      instructionStep: 4,
      instructionText:
        "Place salmon fillets skin-side up in the pan. Cook for 4-5 minutes until golden.",
      stepDurationMinutes: 10,
    },
    {
      instructionStep: 5,
      instructionText:
        "Flip salmon and pour honey garlic sauce over the top. Cook for another 4-5 minutes.",
      stepDurationMinutes: 30,
    },
    {
      instructionStep: 6,
      instructionText:
        "Garnish with sesame seeds and sliced green onions. Serve with steamed vegetables or rice.",
      stepDurationMinutes: 10,
    },
  ],

  // === Nutrition Facts (per serving) ===
  nutritionalInformation: {
    calories: {
      quantity: 380,
      unit: "kcal",
      displayText: "380kcal",
    },
    protein: {
      quantity: 35,
      unit: "g",
      displayText: "35g",
    },
    carbohydrates: {
      quantity: 28,
      unit: "g",
      displayText: "28g",
    },
    fat: {
      quantity: 14,
      unit: "g",
      displayText: "14g",
    },
    fiber: {
      quantity: 0,
      unit: "g",
      displayText: "0g",
    },
    sodium: {
      quantity: 920,
      unit: "mg",
      displayText: "720mg",
    },
  },

  // === Chef's Tips ===
  chefRecommendations: [
    "Don't overcook salmon - it should be slightly pink in the center",
    "Use wild-caught salmon for best flavor and nutrition",
    "Let the sauce caramelize slightly for deeper flavor",
    "Pair with steamed broccoli or asparagus for a complete meal",
  ],

  // === Additional Metadata ===
  recipeTags: ["comfort food", "mediterranean", "family dinner"],
  dietaryFlags: {
    isVegetarianFriendly: false,
    isGlutenFree: false,
    isDairyFree: false,
    isVegan: false,
  },
  recipeMetadata: {
    dateCreated: "2024-01-15",
    lastModifiedDate: "2024-01-20",
    authorName: "Chef Ahmed",
    difficultyRating: 3, // out of 5
  },
};

const recipeData2 = {
  // === Basic Information ===
  recipeId: "recipe-003",
  recipeImageUrl: "../Images/pad-thai.jpg",

  // === Header ===
  header: {
    title: "Pad Thai",
    description: "Popular Thai stir-fried noodles with shrimp and peanuts",
  },

  // === Rating & Reviews ===
  averageRating: {
    value: 4.8,
    displayText: "4.8",
  },
  totalReviewCount: {
    count: 445,
    displayText: "(445 reviews)",
  },

  // === Classification ===
  difficultyLevel: {
    level: "Intermediate",
    displayText: "Intermediate",
  },
  cuisineType: {
    type: "Asian",
    displayText: "Asian",
  },
  recipeCategory: {
    category: "Main Course",
    displayText: "Main Course",
  },

  // === Time & Servings ===
  preparationTime: {
    totalMinutes: 20,
    displayText: "20 min",
  },
  cookingTime: {
    totalMinutes: 15,
    displayText: "15 min",
  },
  totalCookTime: {
    totalMinutes: 35,
    displayText: "35 min",
  },
  servingInfo: {
    servingCount: 2,
    displayText: "2 people",
  },

  // === Ingredients ===
  ingredientsList: [
    {
      ingredientId: 1,
      ingredientText: "200g rice noodles",
      ingredientQuantity: "200",
      measurementUnit: "g",
      ingredientName: "rice noodles",
    },
    {
      ingredientId: 2,
      ingredientText: "200g shrimp, peeled",
      ingredientQuantity: "200",
      measurementUnit: "g",
      ingredientName: "shrimp",
    },
    {
      ingredientId: 3,
      ingredientText: "2 eggs",
      ingredientQuantity: "2",
      measurementUnit: "eggs",
      ingredientName: "eggs",
    },
    {
      ingredientId: 4,
      ingredientText: "3 tablespoons tamarind paste",
      ingredientQuantity: "3",
      measurementUnit: "tablespoons",
      ingredientName: "tamarind paste",
    },
    {
      ingredientId: 5,
      ingredientText: "2 tablespoons fish sauce",
      ingredientQuantity: "2",
      measurementUnit: "tablespoons",
      ingredientName: "fish sauce",
    },
    {
      ingredientId: 6,
      ingredientText: "1 tablespoon palm sugar",
      ingredientQuantity: "1",
      measurementUnit: "tablespoon",
      ingredientName: "palm sugar",
    },
    {
      ingredientId: 7,
      ingredientText: "Bean sprouts",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "bean sprouts",
    },
    {
      ingredientId: 8,
      ingredientText: "Crushed peanuts",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "crushed peanuts",
    },
    {
      ingredientId: 9,
      ingredientText: "Lime wedges and cilantro",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "lime and cilantro",
    },
  ],

  // === Instructions ===
  cookingInstructions: [
    {
      instructionStep: 1,
      instructionText:
        "Soak rice noodles in warm water for 30 minutes. Drain and set aside.",
      stepDurationMinutes: 20,
    },
    {
      instructionStep: 2,
      instructionText:
        "Mix tamarind paste, fish sauce, and palm sugar to make the sauce.",
      stepDurationMinutes: 3,
    },
    {
      instructionStep: 3,
      instructionText: "Heat wok over high heat. Scramble eggs and set aside.",
      stepDurationMinutes: 3,
    },
    {
      instructionStep: 4,
      instructionText:
        "Cook shrimp until pink. Add noodles and sauce, toss for 2-3 minutes.",
      stepDurationMinutes: 2,
    },
    {
      instructionStep: 5,
      instructionText:
        "Add scrambled eggs and bean sprouts. Toss everything together.",
      stepDurationMinutes: 3,
    },
    {
      instructionStep: 6,
      instructionText:
        "Serve topped with crushed peanuts, lime wedges, and cilantro.",
      stepDurationMinutes: 2,
    },
  ],

  // === Nutrition Facts (per serving) ===
  nutritionalInformation: {
    calories: {
      quantity: 540,
      unit: "kcal",
      displayText: "540kcal",
    },
    protein: {
      quantity: 32,
      unit: "g",
      displayText: "32g",
    },
    carbohydrates: {
      quantity: 62,
      unit: "g",
      displayText: "62g",
    },
    fat: {
      quantity: 16,
      unit: "g",
      displayText: "16g",
    },
    fiber: {
      quantity: 4,
      unit: "g",
      displayText: "4g",
    },
    sodium: {
      quantity: 1120,
      unit: "mg",
      displayText: "1120mg",
    },
  },

  // === Chef's Tips ===
  chefRecommendations: [
    "Don't oversoak noodles or they'll be mushy",
    "Cook on high heat for authentic wok flavor",
    "Balance sweet, sour, and salty flavors",
    "Prepare all ingredients before starting to cook",
  ],

  // === Additional Metadata ===
  recipeTags: ["Thai cuisine", "stir-fry", "seafood", "noodles"],
  dietaryFlags: {
    isVegetarianFriendly: false,
    isGlutenFree: false,
    isDairyFree: true,
    isVegan: false,
  },
  recipeMetadata: {
    dateCreated: "2024-01-15",
    lastModifiedDate: "2024-01-20",
    authorName: "Chef Thai",
    difficultyRating: 3, // out of 5
  },
};

const recipeData3 = {
  // === Basic Information ===
  recipeId: "recipe-004",
  recipeImageUrl: "../Images/carbonara.jpg",

  // === Header ===
  header: {
    title: "Creamy Spaghetti Carbonara",
    description: "A classic Italian pasta dish with eggs, cheese, and pancetta",
  },

  // === Rating & Reviews ===
  averageRating: {
    value: 4.8,
    displayText: "4.8",
  },
  totalReviewCount: {
    count: 234,
    displayText: "(234 reviews)",
  },

  // === Classification ===
  difficultyLevel: {
    level: "Easy",
    displayText: "Easy",
  },
  cuisineType: {
    type: "Italian",
    displayText: "Italian",
  },
  recipeCategory: {
    category: "Main Course",
    displayText: "Main Course",
  },

  // === Time & Servings ===
  preparationTime: {
    totalMinutes: 15,
    displayText: "15 min",
  },
  cookingTime: {
    totalMinutes: 20,
    displayText: "20 min",
  },
  totalCookTime: {
    totalMinutes: 35,
    displayText: "35 min",
  },
  servingInfo: {
    servingCount: 4,
    displayText: "4 people",
  },

  // === Ingredients ===
  ingredientsList: [
    {
      ingredientId: 1,
      ingredientText: "400g spaghetti pasta",
      ingredientQuantity: "400",
      measurementUnit: "g",
      ingredientName: "spaghetti pasta",
    },
    {
      ingredientId: 2,
      ingredientText: "200g pancetta or guanciale, diced",
      ingredientQuantity: "200",
      measurementUnit: "g",
      ingredientName: "pancetta",
    },
    {
      ingredientId: 3,
      ingredientText: "4 large eggs",
      ingredientQuantity: "4",
      measurementUnit: "large",
      ingredientName: "eggs",
    },
    {
      ingredientId: 4,
      ingredientText: "100g Pecorino Romano cheese, grated",
      ingredientQuantity: "100",
      measurementUnit: "g",
      ingredientName: "Pecorino Romano cheese",
    },
    {
      ingredientId: 5,
      ingredientText: "50g Parmesan cheese, grated",
      ingredientQuantity: "50",
      measurementUnit: "g",
      ingredientName: "Parmesan cheese",
    },
    {
      ingredientId: 6,
      ingredientText: "Freshly ground black pepper",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "black pepper",
    },
    {
      ingredientId: 7,
      ingredientText: "Salt for pasta water",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "salt",
    },
  ],

  // === Instructions ===
  cookingInstructions: [
    {
      instructionStep: 1,
      instructionText:
        "Bring a large pot of salted water to boil. Cook spaghetti according to package directions until al dente.",
      stepDurationMinutes: 10,
    },
    {
      instructionStep: 2,
      instructionText:
        "While pasta cooks, heat a large skillet over medium heat. Add diced pancetta and cook until crispy, about 5-7 minutes.",
      stepDurationMinutes: 7,
    },
    {
      instructionStep: 3,
      instructionText:
        "In a bowl, whisk together eggs, grated Pecorino Romano, and Parmesan cheese. Add plenty of freshly ground black pepper.",
      stepDurationMinutes: 3,
    },
    {
      instructionStep: 4,
      instructionText:
        "Reserve 1 cup of pasta cooking water before draining. Drain pasta and immediately add to the skillet with pancetta.",
      stepDurationMinutes: 2,
    },
    {
      instructionStep: 5,
      instructionText:
        "Remove skillet from heat. Quickly pour in egg mixture while tossing pasta vigorously. Add reserved pasta water as needed to create a creamy sauce.",
      stepDurationMinutes: 3,
    },
    {
      instructionStep: 6,
      instructionText:
        "Serve immediately with extra cheese and black pepper on top. Enjoy your authentic carbonara!",
      stepDurationMinutes: 2,
    },
  ],

  // === Nutrition Facts (per serving) ===
  nutritionalInformation: {
    calories: {
      quantity: 520,
      unit: "kcal",
      displayText: "520kcal",
    },
    protein: {
      quantity: 28,
      unit: "g",
      displayText: "28g",
    },
    carbohydrates: {
      quantity: 62,
      unit: "g",
      displayText: "62g",
    },
    fat: {
      quantity: 18,
      unit: "g",
      displayText: "18g",
    },
    fiber: {
      quantity: 3,
      unit: "g",
      displayText: "3g",
    },
    sodium: {
      quantity: 680,
      unit: "mg",
      displayText: "680mg",
    },
  },

  // === Chef's Tips ===
  chefRecommendations: [
    "Use room temperature eggs for a smoother sauce consistency",
    "Work quickly when mixing eggs with hot pasta to avoid scrambling",
    "Reserve extra pasta water - it's the secret to perfect creaminess",
    "Freshly grated cheese makes all the difference in flavor",
    "Never add cream - authentic carbonara is made with eggs only",
  ],

  // === Additional Metadata ===
  recipeTags: ["Italian cuisine", "pasta", "comfort food", "authentic"],
  dietaryFlags: {
    isVegetarianFriendly: false,
    isGlutenFree: false,
    isDairyFree: false,
    isVegan: false,
  },
  recipeMetadata: {
    dateCreated: "2024-01-15",
    lastModifiedDate: "2024-01-20",
    authorName: "Chef Marco",
    difficultyRating: 2, // out of 5
  },
};

const recipeData4 = {
  // === Basic Information ===
  recipeId: "recipe-005",
  recipeImageUrl: "../Images/vegetable-curry.jpg",

  // === Header ===
  header: {
    title: "Vegetable Curry",
    description: "Hearty vegetarian curry with coconut milk",
  },

  // === Rating & Reviews ===
  averageRating: {
    value: 4.6,
    displayText: "4.6",
  },
  totalReviewCount: {
    count: 289,
    displayText: "(289 reviews)",
  },

  // === Classification ===
  difficultyLevel: {
    level: "Easy",
    displayText: "Easy",
  },
  cuisineType: {
    type: "Asian",
    displayText: "Asian",
  },
  recipeCategory: {
    category: "Main Course",
    displayText: "Main Course",
  },

  // === Time & Servings ===
  preparationTime: {
    totalMinutes: 50,
    displayText: "50 min",
  },
  cookingTime: {
    totalMinutes: 30,
    displayText: "30 min",
  },
  totalCookTime: {
    totalMinutes: 50,
    displayText: "50 min",
  },
  servingInfo: {
    servingCount: 4,
    displayText: "4 people",
  },

  // === Ingredients ===
  ingredientsList: [
    {
      ingredientId: 1,
      ingredientText: "2 potatoes, cubed",
      ingredientQuantity: "2",
      measurementUnit: "pieces",
      ingredientName: "potatoes",
    },
    {
      ingredientId: 2,
      ingredientText: "1 cauliflower, florets",
      ingredientQuantity: "1",
      measurementUnit: "piece",
      ingredientName: "cauliflower",
    },
    {
      ingredientId: 3,
      ingredientText: "2 carrots, sliced",
      ingredientQuantity: "2",
      measurementUnit: "pieces",
      ingredientName: "carrots",
    },
    {
      ingredientId: 4,
      ingredientText: "1 can chickpeas",
      ingredientQuantity: "1",
      measurementUnit: "can",
      ingredientName: "chickpeas",
    },
    {
      ingredientId: 5,
      ingredientText: "400ml coconut milk",
      ingredientQuantity: "400",
      measurementUnit: "ml",
      ingredientName: "coconut milk",
    },
    {
      ingredientId: 6,
      ingredientText: "3 tablespoons curry powder",
      ingredientQuantity: "3",
      measurementUnit: "tablespoons",
      ingredientName: "curry powder",
    },
    {
      ingredientId: 7,
      ingredientText: "1 onion, diced",
      ingredientQuantity: "1",
      measurementUnit: "piece",
      ingredientName: "onion",
    },
    {
      ingredientId: 8,
      ingredientText: "3 cloves garlic, minced",
      ingredientQuantity: "3",
      measurementUnit: "cloves",
      ingredientName: "garlic",
    },
    {
      ingredientId: 9,
      ingredientText: "Fresh spinach",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "spinach",
    },
  ],

  // === Instructions ===
  cookingInstructions: [
    {
      instructionStep: 1,
      instructionText:
        "Heat oil in a large pot. Sauté onion until soft, add garlic and curry powder, cook for 1 minute.",
      stepDurationMinutes: 1,
    },
    {
      instructionStep: 2,
      instructionText: "Add potatoes and carrots, cook for 5 minutes.",
      stepDurationMinutes: 5,
    },
    {
      instructionStep: 3,
      instructionText: "Pour in coconut milk and 1 cup water. Bring to simmer.",
      stepDurationMinutes: 3,
    },
    {
      instructionStep: 4,
      instructionText:
        "Add cauliflower and chickpeas. Cook for 20 minutes until vegetables are tender.",
      stepDurationMinutes: 20,
    },
    {
      instructionStep: 5,
      instructionText: "Stir in fresh spinach and cook until wilted.",
      stepDurationMinutes: 2,
    },
    {
      instructionStep: 6,
      instructionText: "Serve hot over basmati rice or with naan bread.",
      stepDurationMinutes: 1,
    },
  ],

  // === Nutrition Facts (per serving) ===
  nutritionalInformation: {
    calories: {
      quantity: 380,
      unit: "kcal",
      displayText: "380 kcal",
    },
    protein: {
      quantity: 14,
      unit: "g",
      displayText: "14g",
    },
    carbohydrates: {
      quantity: 48,
      unit: "g",
      displayText: "48g",
    },
    fat: {
      quantity: 16,
      unit: "g",
      displayText: "16g",
    },
    fiber: {
      quantity: 12,
      unit: "g",
      displayText: "12g",
    },
    sodium: {
      quantity: 480,
      unit: "mg",
      displayText: "480mg",
    },
  },

  // === Chef's Tips ===
  chefRecommendations: [
    "Add vegetables in order of cooking time needed",
    "Adjust curry powder amount to taste",
    "Use full-fat coconut milk for creamier curry",
    "Add protein like tofu or paneer if desired",
  ],

  // === Additional Metadata ===
  recipeTags: ["Asian cuisine", "vegetarian", "curry", "comfort food"],
  dietaryFlags: {
    isVegetarianFriendly: true,
    isGlutenFree: false,
    isDairyFree: true,
    isVegan: true,
  },
  recipeMetadata: {
    dateCreated: "2024-02-10",
    lastModifiedDate: "2024-02-12",
    authorName: "Chef Aisha",
    difficultyRating: 2,
  },
};

const recipeData5 = {
  // === Basic Information ===
  recipeId: "recipe-006",
  recipeImageUrl: "../Images/margherita-pizza.jpg",

  // === Header ===
  header: {
    title: "Margherita Pizza",
    description: "Classic Italian pizza with fresh mozzarella and basil",
  },

  // === Rating & Reviews ===
  averageRating: {
    value: 4.9,
    displayText: "4.9",
  },
  totalReviewCount: {
    count: 512,
    displayText: "(512 reviews)",
  },

  // === Classification ===
  difficultyLevel: {
    level: "Intermediate",
    displayText: "Intermediate",
  },
  cuisineType: {
    type: "Italian",
    displayText: "Italian",
  },
  recipeCategory: {
    category: "Main Course",
    displayText: "Main Course",
  },

  // === Time & Servings ===
  preparationTime: {
    totalMinutes: 25,
    displayText: "25 min",
  },
  cookingTime: {
    totalMinutes: 12,
    displayText: "12 min",
  },
  totalCookTime: {
    totalMinutes: 102,
    displayText: "102 min",
  },
  servingInfo: {
    servingCount: 2,
    displayText: "2 people",
  },

  // === Ingredients ===
  ingredientsList: [
    {
      ingredientId: 1,
      ingredientText: "300g pizza dough",
      ingredientQuantity: "300",
      measurementUnit: "g",
      ingredientName: "pizza dough",
    },
    {
      ingredientId: 2,
      ingredientText: "200g crushed tomatoes",
      ingredientQuantity: "200",
      measurementUnit: "g",
      ingredientName: "crushed tomatoes",
    },
    {
      ingredientId: 3,
      ingredientText: "250g fresh mozzarella",
      ingredientQuantity: "250",
      measurementUnit: "g",
      ingredientName: "fresh mozzarella",
    },
    {
      ingredientId: 4,
      ingredientText: "Fresh basil leaves",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "basil",
    },
    {
      ingredientId: 5,
      ingredientText: "2 tablespoons olive oil",
      ingredientQuantity: "2",
      measurementUnit: "tablespoons",
      ingredientName: "olive oil",
    },
    {
      ingredientId: 6,
      ingredientText: "2 cloves garlic, minced",
      ingredientQuantity: "2",
      measurementUnit: "cloves",
      ingredientName: "garlic",
    },
    {
      ingredientId: 7,
      ingredientText: "Salt and pepper to taste",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "salt & pepper",
    },
    {
      ingredientId: 8,
      ingredientText: "Parmesan cheese for topping",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "parmesan cheese",
    },
  ],

  // === Instructions ===
  cookingInstructions: [
    {
      instructionStep: 1,
      instructionText:
        "Let pizza dough come to room temperature and rest for 1 hour.",
      stepDurationMinutes: 60,
    },
    {
      instructionStep: 2,
      instructionText:
        "Preheat oven to maximum temperature (usually 250°C/480°F).",
      stepDurationMinutes: 10,
    },
    {
      instructionStep: 3,
      instructionText:
        "Mix crushed tomatoes with olive oil, garlic, salt, and pepper for the sauce.",
      stepDurationMinutes: 5,
    },
    {
      instructionStep: 4,
      instructionText:
        "Roll out dough on a floured surface to desired thickness.",
      stepDurationMinutes: 5,
    },
    {
      instructionStep: 5,
      instructionText:
        "Spread tomato sauce, add torn mozzarella pieces, and drizzle with olive oil.",
      stepDurationMinutes: 3,
    },
    {
      instructionStep: 6,
      instructionText:
        "Bake for 10-12 minutes until crust is golden. Top with fresh basil and parmesan.",
      stepDurationMinutes: 12,
    },
  ],

  // === Nutrition Facts (per serving) ===
  nutritionalInformation: {
    calories: {
      quantity: 580,
      unit: "kcal",
      displayText: "580 kcal",
    },
    protein: {
      quantity: 24,
      unit: "g",
      displayText: "24g",
    },
    carbohydrates: {
      quantity: 68,
      unit: "g",
      displayText: "68g",
    },
    fat: {
      quantity: 22,
      unit: "g",
      displayText: "22g",
    },
    fiber: {
      quantity: 4,
      unit: "g",
      displayText: "4g",
    },
    sodium: {
      quantity: 920,
      unit: "mg",
      displayText: "920mg",
    },
  },

  // === Chef's Tips ===
  chefRecommendations: [
    "Use a pizza stone for crispier crust",
    "Don't overload with toppings - less is more",
    "Add basil after baking to keep it fresh",
    "Let dough rest properly for best texture",
  ],

  // === Additional Metadata ===
  recipeTags: ["Italian cuisine", "pizza", "classic", "comfort food"],
  dietaryFlags: {
    isVegetarianFriendly: true,
    isGlutenFree: false,
    isDairyFree: false,
    isVegan: false,
  },
  recipeMetadata: {
    dateCreated: "2024-03-01",
    lastModifiedDate: "2024-03-05",
    authorName: "Chef Lorenzo",
    difficultyRating: 3,
  },
};

const recipeData6 = {
  // === Basic Information ===
  recipeId: "recipe-007",
  recipeImageUrl: "../Images/teriyaki-chicken-bowl.jpg",

  // === Header ===
  header: {
    title: "Teriyaki Chicken Bowl",
    description: "Sweet and savory chicken over rice with vegetables",
  },

  // === Rating & Reviews ===
  averageRating: {
    value: 4.7,
    displayText: "4.7",
  },
  totalReviewCount: {
    count: 367,
    displayText: "(367 reviews)",
  },

  // === Classification ===
  difficultyLevel: {
    level: "Easy",
    displayText: "Easy",
  },
  cuisineType: {
    type: "Asian",
    displayText: "Asian",
  },
  recipeCategory: {
    category: "Main Course",
    displayText: "Main Course",
  },

  // === Time & Servings ===
  preparationTime: {
    totalMinutes: 15,
    displayText: "15 min",
  },
  cookingTime: {
    totalMinutes: 20,
    displayText: "20 min",
  },
  totalCookTime: {
    totalMinutes: 35,
    displayText: "35 min",
  },
  servingInfo: {
    servingCount: 2,
    displayText: "2 people",
  },

  // === Ingredients ===
  ingredientsList: [
    {
      ingredientId: 1,
      ingredientText: "400g chicken thighs, sliced",
      ingredientQuantity: "400",
      measurementUnit: "g",
      ingredientName: "chicken thighs",
    },
    {
      ingredientId: 2,
      ingredientText: "1/2 cup teriyaki sauce",
      ingredientQuantity: "1/2",
      measurementUnit: "cup",
      ingredientName: "teriyaki sauce",
    },
    {
      ingredientId: 3,
      ingredientText: "2 cups cooked rice",
      ingredientQuantity: "2",
      measurementUnit: "cups",
      ingredientName: "cooked rice",
    },
    {
      ingredientId: 4,
      ingredientText: "1 broccoli head, florets",
      ingredientQuantity: "1",
      measurementUnit: "piece",
      ingredientName: "broccoli",
    },
    {
      ingredientId: 5,
      ingredientText: "1 carrot, julienned",
      ingredientQuantity: "1",
      measurementUnit: "piece",
      ingredientName: "carrot",
    },
    {
      ingredientId: 6,
      ingredientText: "Sesame seeds",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "sesame seeds",
    },
    {
      ingredientId: 7,
      ingredientText: "Green onions, sliced",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "green onions",
    },
    {
      ingredientId: 8,
      ingredientText: "1 tablespoon sesame oil",
      ingredientQuantity: "1",
      measurementUnit: "tablespoon",
      ingredientName: "sesame oil",
    },
  ],

  // === Instructions ===
  cookingInstructions: [
    {
      instructionStep: 1,
      instructionText:
        "Heat sesame oil in a pan. Cook chicken until browned on all sides.",
      stepDurationMinutes: 7,
    },
    {
      instructionStep: 2,
      instructionText:
        "Add teriyaki sauce to chicken, simmer for 5 minutes until sauce thickens.",
      stepDurationMinutes: 5,
    },
    {
      instructionStep: 3,
      instructionText:
        "Meanwhile, steam broccoli and carrots until tender-crisp.",
      stepDurationMinutes: 8,
    },
    {
      instructionStep: 4,
      instructionText: "Divide rice between bowls.",
      stepDurationMinutes: 1,
    },
    {
      instructionStep: 5,
      instructionText: "Top with teriyaki chicken and steamed vegetables.",
      stepDurationMinutes: 1,
    },
    {
      instructionStep: 6,
      instructionText: "Garnish with sesame seeds and green onions. Serve hot.",
      stepDurationMinutes: 1,
    },
  ],

  // === Nutrition Facts (per serving) ===
  nutritionalInformation: {
    calories: {
      quantity: 540,
      unit: "kcal",
      displayText: "540 kcal",
    },
    protein: {
      quantity: 42,
      unit: "g",
      displayText: "42g",
    },
    carbohydrates: {
      quantity: 58,
      unit: "g",
      displayText: "58g",
    },
    fat: {
      quantity: 14,
      unit: "g",
      displayText: "14g",
    },
    fiber: {
      quantity: 4,
      unit: "g",
      displayText: "4g",
    },
    sodium: {
      quantity: 1240,
      unit: "mg",
      displayText: "1240mg",
    },
  },

  // === Chef's Tips ===
  chefRecommendations: [
    "Use chicken thighs for juicier meat",
    "Make homemade teriyaki sauce for better flavor control",
    "Add edamame for extra protein",
    "Meal prep by cooking rice and chicken ahead",
  ],

  // === Additional Metadata ===
  recipeTags: ["Asian cuisine", "chicken", "rice bowl", "quick meals"],
  dietaryFlags: {
    isVegetarianFriendly: false,
    isGlutenFree: false,
    isDairyFree: true,
    isVegan: false,
  },
  recipeMetadata: {
    dateCreated: "2024-03-10",
    lastModifiedDate: "2024-03-12",
    authorName: "Chef Hana",
    difficultyRating: 2,
  },
};

const recipeData7 = {
  // === Basic Information ===
  recipeId: "recipe-008",
  recipeImageUrl: "../Images/thai-green-curry.jpg",

  // === Header ===
  header: {
    title: "Thai Green Curry",
    description: "Vibrant and aromatic curry with vegetables and coconut milk",
  },

  // === Rating & Reviews ===
  averageRating: {
    value: 4.7,
    displayText: "4.7",
  },
  totalReviewCount: {
    count: 312,
    displayText: "(312 reviews)",
  },

  // === Classification ===
  difficultyLevel: {
    level: "Intermediate",
    displayText: "Intermediate",
  },
  cuisineType: {
    type: "Asian",
    displayText: "Asian",
  },
  recipeCategory: {
    category: "Main Course",
    displayText: "Main Course",
  },

  // === Time & Servings ===
  preparationTime: {
    totalMinutes: 15,
    displayText: "15 min",
  },
  cookingTime: {
    totalMinutes: 25,
    displayText: "25 min",
  },
  totalCookTime: {
    totalMinutes: 40,
    displayText: "40 min",
  },
  servingInfo: {
    servingCount: 4,
    displayText: "4 people",
  },

  // === Ingredients ===
  ingredientsList: [
    {
      ingredientId: 1,
      ingredientText: "2 tablespoons green curry paste",
      ingredientQuantity: "2",
      measurementUnit: "tablespoons",
      ingredientName: "green curry paste",
    },
    {
      ingredientId: 2,
      ingredientText: "400ml coconut milk",
      ingredientQuantity: "400",
      measurementUnit: "ml",
      ingredientName: "coconut milk",
    },
    {
      ingredientId: 3,
      ingredientText: "300g chicken breast, sliced",
      ingredientQuantity: "300",
      measurementUnit: "g",
      ingredientName: "chicken breast",
    },
    {
      ingredientId: 4,
      ingredientText: "1 red bell pepper, sliced",
      ingredientQuantity: "1",
      measurementUnit: "piece",
      ingredientName: "red bell pepper",
    },
    {
      ingredientId: 5,
      ingredientText: "100g green beans",
      ingredientQuantity: "100",
      measurementUnit: "g",
      ingredientName: "green beans",
    },
    {
      ingredientId: 6,
      ingredientText: "1 eggplant, cubed",
      ingredientQuantity: "1",
      measurementUnit: "piece",
      ingredientName: "eggplant",
    },
    {
      ingredientId: 7,
      ingredientText: "2 tablespoons fish sauce",
      ingredientQuantity: "2",
      measurementUnit: "tablespoons",
      ingredientName: "fish sauce",
    },
    {
      ingredientId: 8,
      ingredientText: "1 tablespoon palm sugar",
      ingredientQuantity: "1",
      measurementUnit: "tablespoon",
      ingredientName: "palm sugar",
    },
    {
      ingredientId: 9,
      ingredientText: "Fresh Thai basil leaves",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "Thai basil",
    },
  ],

  // === Instructions ===
  cookingInstructions: [
    {
      instructionStep: 1,
      instructionText:
        "Heat a large pot or wok over medium heat. Add curry paste and cook for 1 minute until fragrant.",
      stepDurationMinutes: 1,
    },
    {
      instructionStep: 2,
      instructionText:
        "Add half the coconut milk and stir to combine with the curry paste.",
      stepDurationMinutes: 2,
    },
    {
      instructionStep: 3,
      instructionText:
        "Add sliced chicken and cook until no longer pink, about 5 minutes.",
      stepDurationMinutes: 5,
    },
    {
      instructionStep: 4,
      instructionText:
        "Add remaining coconut milk, vegetables, fish sauce, and palm sugar.",
      stepDurationMinutes: 3,
    },
    {
      instructionStep: 5,
      instructionText:
        "Simmer for 15–20 minutes until vegetables are tender and sauce has thickened.",
      stepDurationMinutes: 20,
    },
    {
      instructionStep: 6,
      instructionText:
        "Stir in fresh Thai basil leaves. Serve hot with jasmine rice.",
      stepDurationMinutes: 1,
    },
  ],

  // === Nutrition Facts (per serving) ===
  nutritionalInformation: {
    calories: {
      quantity: 420,
      unit: "kcal",
      displayText: "420 kcal",
    },
    protein: {
      quantity: 26,
      unit: "g",
      displayText: "26g",
    },
    carbohydrates: {
      quantity: 22,
      unit: "g",
      displayText: "22g",
    },
    fat: {
      quantity: 26,
      unit: "g",
      displayText: "26g",
    },
    fiber: {
      quantity: 5,
      unit: "g",
      displayText: "5g",
    },
    sodium: {
      quantity: 890,
      unit: "mg",
      displayText: "890mg",
    },
  },

  // === Chef's Tips ===
  chefRecommendations: [
    "Adjust spice level by using more or less curry paste",
    "Add vegetables in stages based on cooking time needed",
    "Fresh Thai basil is essential for authentic flavor",
    "Use full-fat coconut milk for richest, creamiest sauce",
  ],

  // === Additional Metadata ===
  recipeTags: ["Asian cuisine", "Thai", "curry", "spicy"],
  dietaryFlags: {
    isVegetarianFriendly: false,
    isGlutenFree: false,
    isDairyFree: true,
    isVegan: false,
  },
  recipeMetadata: {
    dateCreated: "2024-03-15",
    lastModifiedDate: "2024-03-18",
    authorName: "Chef Arun",
    difficultyRating: 3,
  },
};

const recipeData8 = {
  // === Basic Information ===
  recipeId: "recipe-009",
  recipeImageUrl: "../Images/beef-tacos.jpg",

  // === Header ===
  header: {
    title: "Beef Tacos",
    description: "Flavorful Mexican tacos with seasoned ground beef",
  },

  // === Rating & Reviews ===
  averageRating: {
    value: 4.6,
    displayText: "4.6",
  },
  totalReviewCount: {
    count: 278,
    displayText: "(278 reviews)",
  },

  // === Classification ===
  difficultyLevel: {
    level: "Easy",
    displayText: "Easy",
  },
  cuisineType: {
    type: "American",
    displayText: "American",
  },
  recipeCategory: {
    category: "Main Course",
    displayText: "Main Course",
  },

  // === Time & Servings ===
  preparationTime: {
    totalMinutes: 75,
    displayText: "75 min",
  },
  cookingTime: {
    totalMinutes: 20,
    displayText: "20 min",
  },
  totalCookTime: {
    totalMinutes: 35,
    displayText: "35 min",
  },
  servingInfo: {
    servingCount: 4,
    displayText: "4 people",
  },

  // === Ingredients ===
  ingredientsList: [
    {
      ingredientId: 1,
      ingredientText: "500g ground beef",
      ingredientQuantity: "500",
      measurementUnit: "g",
      ingredientName: "ground beef",
    },
    {
      ingredientId: 2,
      ingredientText: "8 taco shells",
      ingredientQuantity: "8",
      measurementUnit: "pieces",
      ingredientName: "taco shells",
    },
    {
      ingredientId: 3,
      ingredientText: "1 onion, diced",
      ingredientQuantity: "1",
      measurementUnit: "piece",
      ingredientName: "onion",
    },
    {
      ingredientId: 4,
      ingredientText: "2 tablespoons taco seasoning",
      ingredientQuantity: "2",
      measurementUnit: "tablespoons",
      ingredientName: "taco seasoning",
    },
    {
      ingredientId: 5,
      ingredientText: "Shredded lettuce",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "lettuce",
    },
    {
      ingredientId: 6,
      ingredientText: "Diced tomatoes",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "tomatoes",
    },
    {
      ingredientId: 7,
      ingredientText: "Shredded cheddar cheese",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "cheddar cheese",
    },
    {
      ingredientId: 8,
      ingredientText: "Sour cream",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "sour cream",
    },
    {
      ingredientId: 9,
      ingredientText: "Salsa",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "salsa",
    },
  ],

  // === Instructions ===
  cookingInstructions: [
    {
      instructionStep: 1,
      instructionText:
        "Heat a large skillet over medium-high heat. Cook ground beef until browned.",
      stepDurationMinutes: 7,
    },
    {
      instructionStep: 2,
      instructionText:
        "Add diced onion and cook until softened, about 5 minutes.",
      stepDurationMinutes: 5,
    },
    {
      instructionStep: 3,
      instructionText:
        "Stir in taco seasoning and 1/2 cup water. Simmer for 10 minutes.",
      stepDurationMinutes: 10,
    },
    {
      instructionStep: 4,
      instructionText: "Warm taco shells according to package directions.",
      stepDurationMinutes: 2,
    },
    {
      instructionStep: 5,
      instructionText: "Fill each shell with seasoned beef.",
      stepDurationMinutes: 1,
    },
    {
      instructionStep: 6,
      instructionText:
        "Top with lettuce, tomatoes, cheese, sour cream, and salsa. Serve immediately.",
      stepDurationMinutes: 1,
    },
  ],

  // === Nutrition Facts (per serving) ===
  nutritionalInformation: {
    calories: {
      quantity: 420,
      unit: "kcal",
      displayText: "420 kcal",
    },
    protein: {
      quantity: 26,
      unit: "g",
      displayText: "26g",
    },
    carbohydrates: {
      quantity: 32,
      unit: "g",
      displayText: "32g",
    },
    fat: {
      quantity: 20,
      unit: "g",
      displayText: "20g",
    },
    fiber: {
      quantity: 4,
      unit: "g",
      displayText: "4g",
    },
    sodium: {
      quantity: 780,
      unit: "mg",
      displayText: "780mg",
    },
  },

  // === Chef's Tips ===
  chefRecommendations: [
    "Drain excess fat from beef for healthier tacos",
    "Warm shells in oven for better texture",
    "Prepare all toppings before cooking beef",
    "Use ground turkey for a lighter option",
  ],

  // === Additional Metadata ===
  recipeTags: ["American cuisine", "tacos", "beef", "quick meals"],
  dietaryFlags: {
    isVegetarianFriendly: false,
    isGlutenFree: false,
    isDairyFree: false,
    isVegan: false,
  },
  recipeMetadata: {
    dateCreated: "2024-03-20",
    lastModifiedDate: "2024-03-22",
    authorName: "Chef Diego",
    difficultyRating: 2,
  },
};

const recipeData9 = {
  // === Basic Information ===
  recipeId: "recipe-010",
  recipeImageUrl: "../Images/classic-beef-burger.jpg",

  // === Header ===
  header: {
    title: "Classic Beef Burger",
    description: "Juicy homemade burger with all the fixings",
  },

  // === Rating & Reviews ===
  averageRating: {
    value: 4.6,
    displayText: "4.6",
  },
  totalReviewCount: {
    count: 421,
    displayText: "(421 reviews)",
  },

  // === Classification ===
  difficultyLevel: {
    level: "Easy",
    displayText: "Easy",
  },
  cuisineType: {
    type: "American",
    displayText: "American",
  },
  recipeCategory: {
    category: "Main Course",
    displayText: "Main Course",
  },

  // === Time & Servings ===
  preparationTime: {
    totalMinutes: 15,
    displayText: "15 min",
  },
  cookingTime: {
    totalMinutes: 20,
    displayText: "20 min",
  },
  totalCookTime: {
    totalMinutes: 35,
    displayText: "35 min",
  },
  servingInfo: {
    servingCount: 4,
    displayText: "4 people",
  },

  // === Ingredients ===
  ingredientsList: [
    {
      ingredientId: 1,
      ingredientText: "500g ground beef (80/20)",
      ingredientQuantity: "500",
      measurementUnit: "g",
      ingredientName: "ground beef",
    },
    {
      ingredientId: 2,
      ingredientText: "4 burger buns",
      ingredientQuantity: "4",
      measurementUnit: "pieces",
      ingredientName: "burger buns",
    },
    {
      ingredientId: 3,
      ingredientText: "4 slices cheddar cheese",
      ingredientQuantity: "4",
      measurementUnit: "slices",
      ingredientName: "cheddar cheese",
    },
    {
      ingredientId: 4,
      ingredientText: "Lettuce leaves",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "lettuce",
    },
    {
      ingredientId: 5,
      ingredientText: "Tomato slices",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "tomato",
    },
    {
      ingredientId: 6,
      ingredientText: "Red onion, sliced",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "red onion",
    },
    {
      ingredientId: 7,
      ingredientText: "Pickles",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "pickles",
    },
    {
      ingredientId: 8,
      ingredientText: "Burger sauce or condiments",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "burger sauce",
    },
  ],

  // === Instructions ===
  cookingInstructions: [
    {
      instructionStep: 1,
      instructionText:
        "Divide ground beef into 4 equal portions. Form into patties, making a small indent in the center.",
      stepDurationMinutes: 5,
    },
    {
      instructionStep: 2,
      instructionText:
        "Season patties generously with salt and pepper on both sides.",
      stepDurationMinutes: 2,
    },
    {
      instructionStep: 3,
      instructionText:
        "Heat a grill or skillet over high heat. Cook patties for 4–5 minutes per side for medium.",
      stepDurationMinutes: 10,
    },
    {
      instructionStep: 4,
      instructionText:
        "Add cheese slices in the last minute of cooking and cover to melt.",
      stepDurationMinutes: 1,
    },
    {
      instructionStep: 5,
      instructionText: "Toast burger buns lightly on the grill or in a pan.",
      stepDurationMinutes: 2,
    },
    {
      instructionStep: 6,
      instructionText:
        "Assemble burgers with lettuce, tomato, onion, pickles, and your favorite sauce.",
      stepDurationMinutes: 2,
    },
  ],

  // === Nutrition Facts (per serving) ===
  nutritionalInformation: {
    calories: {
      quantity: 650,
      unit: "kcal",
      displayText: "650 kcal",
    },
    protein: {
      quantity: 38,
      unit: "g",
      displayText: "38g",
    },
    carbohydrates: {
      quantity: 42,
      unit: "g",
      displayText: "42g",
    },
    fat: {
      quantity: 35,
      unit: "g",
      displayText: "35g",
    },
    fiber: {
      quantity: 2,
      unit: "g",
      displayText: "2g",
    },
    sodium: {
      quantity: 920,
      unit: "mg",
      displayText: "920mg",
    },
  },

  // === Chef's Tips ===
  chefRecommendations: [
    "Don't press down on burgers while cooking - keeps them juicy",
    "Make indent in center to prevent burger from puffing up",
    "Let patties rest for 2-3 minutes before serving",
    "Toast buns for better texture and flavor",
  ],

  // === Additional Metadata ===
  recipeTags: ["American cuisine", "burger", "beef", "comfort food"],
  dietaryFlags: {
    isVegetarianFriendly: false,
    isGlutenFree: false,
    isDairyFree: false,
    isVegan: false,
  },
  recipeMetadata: {
    dateCreated: "2024-03-25",
    lastModifiedDate: "2024-03-27",
    authorName: "Chef Mason",
    difficultyRating: 2,
  },
};

const recipeData10 = {
  // === Basic Information ===
  recipeId: "recipe-011",
  recipeImageUrl: "../Images/lasagna-bolognese.jpg",

  // === Header ===
  header: {
    title: "Lasagna Bolognese",
    description: "Layered Italian pasta with rich meat sauce and béchamel",
  },

  // === Rating & Reviews ===
  averageRating: {
    value: 4.9,
    displayText: "4.9",
  },
  totalReviewCount: {
    count: 478,
    displayText: "(478 reviews)",
  },

  // === Classification ===
  difficultyLevel: {
    level: "Intermediate",
    displayText: "Intermediate",
  },
  cuisineType: {
    type: "Italian",
    displayText: "Italian",
  },
  recipeCategory: {
    category: "Main Course",
    displayText: "Main Course",
  },

  // === Time & Servings ===
  preparationTime: {
    totalMinutes: 30,
    displayText: "30 min",
  },
  cookingTime: {
    totalMinutes: 90,
    displayText: "90 min",
  },
  totalCookTime: {
    totalMinutes: 120,
    displayText: "120 min",
  },
  servingInfo: {
    servingCount: 4,
    displayText: "4 people",
  },

  // === Ingredients ===
  ingredientsList: [
    {
      ingredientId: 1,
      ingredientText: "12 lasagna sheets",
      ingredientQuantity: "12",
      measurementUnit: "pieces",
      ingredientName: "lasagna sheets",
    },
    {
      ingredientId: 2,
      ingredientText: "500g ground beef",
      ingredientQuantity: "500",
      measurementUnit: "g",
      ingredientName: "ground beef",
    },
    {
      ingredientId: 3,
      ingredientText: "400g canned tomatoes",
      ingredientQuantity: "400",
      measurementUnit: "g",
      ingredientName: "canned tomatoes",
    },
    {
      ingredientId: 4,
      ingredientText: "1 onion, diced",
      ingredientQuantity: "1",
      measurementUnit: "piece",
      ingredientName: "onion",
    },
    {
      ingredientId: 5,
      ingredientText: "2 carrots, diced",
      ingredientQuantity: "2",
      measurementUnit: "pieces",
      ingredientName: "carrots",
    },
    {
      ingredientId: 6,
      ingredientText: "500ml béchamel sauce",
      ingredientQuantity: "500",
      measurementUnit: "ml",
      ingredientName: "béchamel sauce",
    },
    {
      ingredientId: 7,
      ingredientText: "200g mozzarella, grated",
      ingredientQuantity: "200",
      measurementUnit: "g",
      ingredientName: "mozzarella",
    },
    {
      ingredientId: 8,
      ingredientText: "100g parmesan cheese",
      ingredientQuantity: "100",
      measurementUnit: "g",
      ingredientName: "parmesan cheese",
    },
    {
      ingredientId: 9,
      ingredientText: "Fresh basil",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "basil",
    },
  ],

  // === Instructions ===
  cookingInstructions: [
    {
      instructionStep: 1,
      instructionText:
        "Cook ground beef with onion and carrots until browned. Add tomatoes and simmer for 30 minutes.",
      stepDurationMinutes: 30,
    },
    {
      instructionStep: 2,
      instructionText:
        "Cook lasagna sheets according to package directions. Drain and set aside.",
      stepDurationMinutes: 10,
    },
    {
      instructionStep: 3,
      instructionText: "Preheat oven to 180°C (350°F).",
      stepDurationMinutes: 5,
    },
    {
      instructionStep: 4,
      instructionText:
        "In a baking dish, layer: meat sauce, lasagna sheets, béchamel sauce. Repeat 3–4 times.",
      stepDurationMinutes: 10,
    },
    {
      instructionStep: 5,
      instructionText:
        "Top final layer with béchamel, mozzarella, and parmesan cheese.",
      stepDurationMinutes: 5,
    },
    {
      instructionStep: 6,
      instructionText:
        "Bake for 45 minutes until golden and bubbly. Let rest 10 minutes before serving.",
      stepDurationMinutes: 45,
    },
  ],

  // === Nutrition Facts (per serving) ===
  nutritionalInformation: {
    calories: {
      quantity: 680,
      unit: "kcal",
      displayText: "680 kcal",
    },
    protein: {
      quantity: 42,
      unit: "g",
      displayText: "42g",
    },
    carbohydrates: {
      quantity: 58,
      unit: "g",
      displayText: "58g",
    },
    fat: {
      quantity: 28,
      unit: "g",
      displayText: "28g",
    },
    fiber: {
      quantity: 6,
      unit: "g",
      displayText: "6g",
    },
    sodium: {
      quantity: 920,
      unit: "mg",
      displayText: "920mg",
    },
  },

  // === Chef's Tips ===
  chefRecommendations: [
    "Make bolognese sauce a day ahead for better flavor",
    "Don't skip the resting time after baking",
    "Use fresh pasta sheets for best texture",
    "Freeze leftovers in individual portions",
  ],

  // === Additional Metadata ===
  recipeTags: ["Italian cuisine", "lasagna", "bolognese", "comfort food"],
  dietaryFlags: {
    isVegetarianFriendly: false,
    isGlutenFree: false,
    isDairyFree: false,
    isVegan: false,
  },
  recipeMetadata: {
    dateCreated: "2024-04-01",
    lastModifiedDate: "2024-04-03",
    authorName: "Chef Romano",
    difficultyRating: 3,
  },
};

const recipeData11 = {
  // === Basic Information ===
  recipeId: "recipe-012",
  recipeImageUrl: "../Images/chicken-tikka-masala.jpg",

  // === Header ===
  header: {
    title: "Chicken Tikka Masala",
    description: "Rich and creamy Indian curry with tender chicken pieces",
  },

  // === Rating & Reviews ===
  averageRating: {
    value: 4.7,
    displayText: "4.7",
  },
  totalReviewCount: {
    count: 389,
    displayText: "(389 reviews)",
  },

  // === Classification ===
  difficultyLevel: {
    level: "Intermediate",
    displayText: "Intermediate",
  },
  cuisineType: {
    type: "Asian",
    displayText: "Asian",
  },
  recipeCategory: {
    category: "Main Course",
    displayText: "Main Course",
  },

  // === Time & Servings ===
  preparationTime: {
    totalMinutes: 20,
    displayText: "20 min",
  },
  cookingTime: {
    totalMinutes: 30,
    displayText: "30 min",
  },
  totalCookTime: {
    totalMinutes: 50,
    displayText: "50 min",
  },
  servingInfo: {
    servingCount: 4,
    displayText: "4 people",
  },

  // === Ingredients ===
  ingredientsList: [
    {
      ingredientId: 1,
      ingredientText: "600g chicken breast, cubed",
      ingredientQuantity: "600",
      measurementUnit: "g",
      ingredientName: "chicken breast",
    },
    {
      ingredientId: 2,
      ingredientText: "1 cup plain yogurt",
      ingredientQuantity: "1",
      measurementUnit: "cup",
      ingredientName: "yogurt",
    },
    {
      ingredientId: 3,
      ingredientText: "2 tablespoons tikka masala paste",
      ingredientQuantity: "2",
      measurementUnit: "tablespoons",
      ingredientName: "tikka masala paste",
    },
    {
      ingredientId: 4,
      ingredientText: "400ml coconut cream",
      ingredientQuantity: "400",
      measurementUnit: "ml",
      ingredientName: "coconut cream",
    },
    {
      ingredientId: 5,
      ingredientText: "1 onion, diced",
      ingredientQuantity: "1",
      measurementUnit: "piece",
      ingredientName: "onion",
    },
    {
      ingredientId: 6,
      ingredientText: "4 cloves garlic, minced",
      ingredientQuantity: "4",
      measurementUnit: "cloves",
      ingredientName: "garlic",
    },
    {
      ingredientId: 7,
      ingredientText: "2 tablespoons ginger, grated",
      ingredientQuantity: "2",
      measurementUnit: "tablespoons",
      ingredientName: "ginger",
    },
    {
      ingredientId: 8,
      ingredientText: "400g canned tomatoes",
      ingredientQuantity: "400",
      measurementUnit: "g",
      ingredientName: "canned tomatoes",
    },
    {
      ingredientId: 9,
      ingredientText: "Fresh cilantro for garnish",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "cilantro",
    },
  ],

  // === Instructions ===
  cookingInstructions: [
    {
      instructionStep: 1,
      instructionText:
        "Marinate chicken in half the yogurt and 1 tablespoon tikka paste for at least 30 minutes.",
      stepDurationMinutes: 30,
    },
    {
      instructionStep: 2,
      instructionText:
        "Heat oil in a large pan, cook marinated chicken until browned. Remove and set aside.",
      stepDurationMinutes: 7,
    },
    {
      instructionStep: 3,
      instructionText:
        "In the same pan, sauté onion until soft. Add garlic and ginger, cook for 1 minute.",
      stepDurationMinutes: 5,
    },
    {
      instructionStep: 4,
      instructionText:
        "Add remaining tikka paste and canned tomatoes. Simmer for 10 minutes.",
      stepDurationMinutes: 10,
    },
    {
      instructionStep: 5,
      instructionText:
        "Stir in coconut cream and remaining yogurt. Add chicken back to the pan.",
      stepDurationMinutes: 3,
    },
    {
      instructionStep: 6,
      instructionText:
        "Simmer for 15 minutes until sauce thickens. Garnish with cilantro and serve with rice.",
      stepDurationMinutes: 15,
    },
  ],

  // === Nutrition Facts (per serving) ===
  nutritionalInformation: {
    calories: {
      quantity: 450,
      unit: "kcal",
      displayText: "450 kcal",
    },
    protein: {
      quantity: 38,
      unit: "g",
      displayText: "38g",
    },
    carbohydrates: {
      quantity: 24,
      unit: "g",
      displayText: "24g",
    },
    fat: {
      quantity: 22,
      unit: "g",
      displayText: "22g",
    },
    fiber: {
      quantity: 4,
      unit: "g",
      displayText: "4g",
    },
    sodium: {
      quantity: 760,
      unit: "mg",
      displayText: "760mg",
    },
  },

  // === Chef's Tips ===
  chefRecommendations: [
    "Marinate chicken overnight for deeper flavor",
    "Use full-fat coconut cream for richest sauce",
    "Adjust spice level by varying the tikka paste amount",
    "Serve with naan bread and basmati rice",
  ],

  // === Additional Metadata ===
  recipeTags: ["Asian cuisine", "Indian", "curry", "comfort food"],
  dietaryFlags: {
    isVegetarianFriendly: false,
    isGlutenFree: true,
    isDairyFree: false,
    isVegan: false,
  },
  recipeMetadata: {
    dateCreated: "2024-04-10",
    lastModifiedDate: "2024-04-12",
    authorName: "Chef Priya",
    difficultyRating: 3,
  },
};

const recipeData12 = {
  // === Basic Information ===
  recipeId: "recipe-013",
  recipeImageUrl: "../Images/caprese-sandwich.jpg",

  // === Header ===
  header: {
    title: "Caprese Sandwich",
    description: "Fresh Italian sandwich with mozzarella, tomato, and basil",
  },

  // === Rating & Reviews ===
  averageRating: {
    value: 4.5,
    displayText: "4.5",
  },
  totalReviewCount: {
    count: 189,
    displayText: "(189 reviews)",
  },

  // === Classification ===
  difficultyLevel: {
    level: "Easy",
    displayText: "Easy",
  },
  cuisineType: {
    type: "Italian",
    displayText: "Italian",
  },
  recipeCategory: {
    category: "Main Course",
    displayText: "Main Course",
  },

  // === Time & Servings ===
  preparationTime: {
    totalMinutes: 90,
    displayText: "90 min",
  },
  cookingTime: {
    totalMinutes: 5,
    displayText: "5 min",
  },
  totalCookTime: {
    totalMinutes: 15,
    displayText: "15 min",
  },
  servingInfo: {
    servingCount: 2,
    displayText: "2 people",
  },

  // === Ingredients ===
  ingredientsList: [
    {
      ingredientId: 1,
      ingredientText: "1 ciabatta bread",
      ingredientQuantity: "1",
      measurementUnit: "piece",
      ingredientName: "ciabatta bread",
    },
    {
      ingredientId: 2,
      ingredientText: "200g fresh mozzarella, sliced",
      ingredientQuantity: "200",
      measurementUnit: "g",
      ingredientName: "fresh mozzarella",
    },
    {
      ingredientId: 3,
      ingredientText: "2 large tomatoes, sliced",
      ingredientQuantity: "2",
      measurementUnit: "pieces",
      ingredientName: "tomatoes",
    },
    {
      ingredientId: 4,
      ingredientText: "Fresh basil leaves",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "basil",
    },
    {
      ingredientId: 5,
      ingredientText: "3 tablespoons pesto",
      ingredientQuantity: "3",
      measurementUnit: "tablespoons",
      ingredientName: "pesto",
    },
    {
      ingredientId: 6,
      ingredientText: "2 tablespoons balsamic glaze",
      ingredientQuantity: "2",
      measurementUnit: "tablespoons",
      ingredientName: "balsamic glaze",
    },
    {
      ingredientId: 7,
      ingredientText: "Olive oil",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "olive oil",
    },
    {
      ingredientId: 8,
      ingredientText: "Salt and pepper",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "salt & pepper",
    },
  ],

  // === Instructions ===
  cookingInstructions: [
    {
      instructionStep: 1,
      instructionText: "Slice ciabatta bread in half horizontally.",
      stepDurationMinutes: 1,
    },
    {
      instructionStep: 2,
      instructionText: "Toast bread lightly until just crispy.",
      stepDurationMinutes: 2,
    },
    {
      instructionStep: 3,
      instructionText: "Spread pesto on both sides of bread.",
      stepDurationMinutes: 1,
    },
    {
      instructionStep: 4,
      instructionText:
        "Layer mozzarella slices, tomato slices, and fresh basil leaves.",
      stepDurationMinutes: 2,
    },
    {
      instructionStep: 5,
      instructionText:
        "Drizzle with olive oil and balsamic glaze. Season with salt and pepper.",
      stepDurationMinutes: 1,
    },
    {
      instructionStep: 6,
      instructionText: "Close sandwich, cut in half, and serve immediately.",
      stepDurationMinutes: 1,
    },
  ],

  // === Nutrition Facts (per serving) ===
  nutritionalInformation: {
    calories: {
      quantity: 480,
      unit: "kcal",
      displayText: "480 kcal",
    },
    protein: {
      quantity: 22,
      unit: "g",
      displayText: "22g",
    },
    carbohydrates: {
      quantity: 48,
      unit: "g",
      displayText: "48g",
    },
    fat: {
      quantity: 22,
      unit: "g",
      displayText: "22g",
    },
    fiber: {
      quantity: 3,
      unit: "g",
      displayText: "3g",
    },
    sodium: {
      quantity: 680,
      unit: "mg",
      displayText: "680mg",
    },
  },

  // === Chef's Tips ===
  chefRecommendations: [
    "Use ripe, in-season tomatoes for best flavor",
    "Buffalo mozzarella is traditional but harder to slice",
    "Toast bread lightly - not too crispy",
    "Add prosciutto or salami for a heartier sandwich",
  ],

  // === Additional Metadata ===
  recipeTags: ["Italian cuisine", "sandwich", "vegetarian", "fresh"],
  dietaryFlags: {
    isVegetarianFriendly: true,
    isGlutenFree: false,
    isDairyFree: false,
    isVegan: false,
  },
  recipeMetadata: {
    dateCreated: "2024-04-15",
    lastModifiedDate: "2024-04-17",
    authorName: "Chef Lucia",
    difficultyRating: 1,
  },
};

const recipeData13 = {
  // === Basic Information ===
  recipeId: "recipe-014",
  recipeImageUrl: "../Images/caesar-salad.jpg",

  // === Header ===
  header: {
    title: "Caesar Salad",
    description: "Classic salad with crispy romaine and creamy dressing",
  },

  // === Rating & Reviews ===
  averageRating: {
    value: 4.4,
    displayText: "4.4",
  },
  totalReviewCount: {
    count: 198,
    displayText: "(198 reviews)",
  },

  // === Classification ===
  difficultyLevel: {
    level: "Easy",
    displayText: "Easy",
  },
  cuisineType: {
    type: "Mediterranean",
    displayText: "Mediterranean",
  },
  recipeCategory: {
    category: "Main Course",
    displayText: "Main Course",
  },

  // === Time & Servings ===
  preparationTime: {
    totalMinutes: 15,
    displayText: "15 min",
  },
  cookingTime: {
    totalMinutes: 0,
    displayText: "0 min",
  },
  totalCookTime: {
    totalMinutes: 15,
    displayText: "15 min",
  },
  servingInfo: {
    servingCount: 2,
    displayText: "2 people",
  },

  // === Ingredients ===
  ingredientsList: [
    {
      ingredientId: 1,
      ingredientText: "1 large romaine lettuce",
      ingredientQuantity: "1",
      measurementUnit: "piece",
      ingredientName: "romaine lettuce",
    },
    {
      ingredientId: 2,
      ingredientText: "1/2 cup Caesar dressing",
      ingredientQuantity: "1/2",
      measurementUnit: "cup",
      ingredientName: "Caesar dressing",
    },
    {
      ingredientId: 3,
      ingredientText: "1/2 cup parmesan cheese, shaved",
      ingredientQuantity: "1/2",
      measurementUnit: "cup",
      ingredientName: "parmesan cheese",
    },
    {
      ingredientId: 4,
      ingredientText: "1 cup croutons",
      ingredientQuantity: "1",
      measurementUnit: "cup",
      ingredientName: "croutons",
    },
    {
      ingredientId: 5,
      ingredientText: "2 anchovy fillets (optional)",
      ingredientQuantity: "2",
      measurementUnit: "pieces",
      ingredientName: "anchovies",
    },
    {
      ingredientId: 6,
      ingredientText: "Lemon wedges",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "lemon",
    },
    {
      ingredientId: 7,
      ingredientText: "Black pepper",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "black pepper",
    },
  ],

  // === Instructions ===
  cookingInstructions: [
    {
      instructionStep: 1,
      instructionText:
        "Wash and dry romaine lettuce thoroughly. Tear into bite-sized pieces.",
      stepDurationMinutes: 3,
    },
    {
      instructionStep: 2,
      instructionText: "Place lettuce in a large salad bowl.",
      stepDurationMinutes: 1,
    },
    {
      instructionStep: 3,
      instructionText: "Add Caesar dressing and toss until evenly coated.",
      stepDurationMinutes: 2,
    },
    {
      instructionStep: 4,
      instructionText:
        "Add croutons and half the parmesan cheese. Toss gently.",
      stepDurationMinutes: 2,
    },
    {
      instructionStep: 5,
      instructionText:
        "Top with remaining parmesan shavings and anchovies if using.",
      stepDurationMinutes: 1,
    },
    {
      instructionStep: 6,
      instructionText:
        "Serve immediately with lemon wedges and fresh black pepper.",
      stepDurationMinutes: 1,
    },
  ],

  // === Nutrition Facts (per serving) ===
  nutritionalInformation: {
    calories: {
      quantity: 320,
      unit: "kcal",
      displayText: "320 kcal",
    },
    protein: {
      quantity: 12,
      unit: "g",
      displayText: "12g",
    },
    carbohydrates: {
      quantity: 18,
      unit: "g",
      displayText: "18g",
    },
    fat: {
      quantity: 22,
      unit: "g",
      displayText: "22g",
    },
    fiber: {
      quantity: 3,
      unit: "g",
      displayText: "3g",
    },
    sodium: {
      quantity: 680,
      unit: "mg",
      displayText: "680mg",
    },
  },

  // === Chef's Tips ===
  chefRecommendations: [
    "Use cold, crisp lettuce for best texture",
    "Make homemade croutons for better flavor",
    "Add grilled chicken for a complete meal",
    "Don't dress salad until ready to serve",
  ],

  // === Additional Metadata ===
  recipeTags: ["Mediterranean cuisine", "salad", "fresh", "quick"],
  dietaryFlags: {
    isVegetarianFriendly: true,
    isGlutenFree: false,
    isDairyFree: false,
    isVegan: false,
  },
  recipeMetadata: {
    dateCreated: "2024-04-20",
    lastModifiedDate: "2024-04-22",
    authorName: "Chef Elena",
    difficultyRating: 1,
  },
};

const recipeData14 = {
  // === Basic Information ===
  recipeId: "recipe-015",
  recipeImageUrl: "../Images/mediterranean-quinoa-bowl.jpg",

  // === Header ===
  header: {
    title: "Mediterranean Quinoa Bowl",
    description: "Healthy bowl with quinoa, vegetables, and tahini dressing",
  },

  // === Rating & Reviews ===
  averageRating: {
    value: 4.5,
    displayText: "4.5",
  },
  totalReviewCount: {
    count: 156,
    displayText: "(156 reviews)",
  },

  // === Classification ===
  difficultyLevel: {
    level: "Easy",
    displayText: "Easy",
  },
  cuisineType: {
    type: "Mediterranean",
    displayText: "Mediterranean",
  },
  recipeCategory: {
    category: "Main Course",
    displayText: "Main Course",
  },

  // === Time & Servings ===
  preparationTime: {
    totalMinutes: 20,
    displayText: "20 min",
  },
  cookingTime: {
    totalMinutes: 35,
    displayText: "35 min",
  },
  totalCookTime: {
    totalMinutes: 55,
    displayText: "55 min",
  },
  servingInfo: {
    servingCount: 2,
    displayText: "2 people",
  },

  // === Ingredients ===
  ingredientsList: [
    {
      ingredientId: 1,
      ingredientText: "1 cup quinoa",
      ingredientQuantity: "1",
      measurementUnit: "cup",
      ingredientName: "quinoa",
    },
    {
      ingredientId: 2,
      ingredientText: "Cherry tomatoes, halved",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "cherry tomatoes",
    },
    {
      ingredientId: 3,
      ingredientText: "Cucumber, diced",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "cucumber",
    },
    {
      ingredientId: 4,
      ingredientText: "Red onion, sliced",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "red onion",
    },
    {
      ingredientId: 5,
      ingredientText: "Kalamata olives",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "olives",
    },
    {
      ingredientId: 6,
      ingredientText: "Feta cheese, crumbled",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "feta cheese",
    },
    {
      ingredientId: 7,
      ingredientText: "Fresh parsley",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "parsley",
    },
    {
      ingredientId: 8,
      ingredientText: "Tahini dressing",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "tahini dressing",
    },
  ],

  // === Instructions ===
  cookingInstructions: [
    {
      instructionStep: 1,
      instructionText:
        "Rinse quinoa thoroughly. Cook according to package directions, usually 15 minutes.",
      stepDurationMinutes: 15,
    },
    {
      instructionStep: 2,
      instructionText:
        "While quinoa cooks, prepare all vegetables and set aside.",
      stepDurationMinutes: 10,
    },
    {
      instructionStep: 3,
      instructionText:
        "For tahini dressing: mix tahini, lemon juice, garlic, and water until smooth.",
      stepDurationMinutes: 5,
    },
    {
      instructionStep: 4,
      instructionText: "Fluff cooked quinoa with a fork and let cool slightly.",
      stepDurationMinutes: 5,
    },
    {
      instructionStep: 5,
      instructionText:
        "Arrange quinoa in bowls. Top with tomatoes, cucumber, onion, and olives.",
      stepDurationMinutes: 5,
    },
    {
      instructionStep: 6,
      instructionText:
        "Sprinkle with feta cheese and fresh parsley. Drizzle with tahini dressing.",
      stepDurationMinutes: 5,
    },
  ],

  // === Nutrition Facts (per serving) ===
  nutritionalInformation: {
    calories: {
      quantity: 480,
      unit: "kcal",
      displayText: "480 kcal",
    },
    protein: {
      quantity: 18,
      unit: "g",
      displayText: "18g",
    },
    carbohydrates: {
      quantity: 58,
      unit: "g",
      displayText: "58g",
    },
    fat: {
      quantity: 20,
      unit: "g",
      displayText: "20g",
    },
    fiber: {
      quantity: 10,
      unit: "g",
      displayText: "10g",
    },
    sodium: {
      quantity: 540,
      unit: "mg",
      displayText: "540mg",
    },
  },

  // === Chef's Tips ===
  chefRecommendations: [
    "Rinse quinoa well to remove bitter coating",
    "Let quinoa cool before adding fresh ingredients",
    "Make extra tahini dressing - it keeps well in the fridge",
    "Add grilled chicken or chickpeas for extra protein",
  ],

  // === Additional Metadata ===
  recipeTags: ["Mediterranean cuisine", "healthy", "quinoa", "vegetarian"],
  dietaryFlags: {
    isVegetarianFriendly: true,
    isGlutenFree: true,
    isDairyFree: false,
    isVegan: false,
  },
  recipeMetadata: {
    dateCreated: "2024-04-25",
    lastModifiedDate: "2024-04-27",
    authorName: "Chef Noura",
    difficultyRating: 1,
  },
};

const recipeData15 = {
  // === Basic Information ===
  recipeId: "recipe-016",
  recipeImageUrl: "../Images/chicken-stir-fry.jpg",

  // === Header ===
  header: {
    title: "Chicken Stir-Fry",
    description: "Quick and healthy stir-fry with colorful vegetables",
  },

  // === Rating & Reviews ===
  averageRating: {
    value: 4.5,
    displayText: "4.5",
  },
  totalReviewCount: {
    count: 324,
    displayText: "(324 reviews)",
  },

  // === Classification ===
  difficultyLevel: {
    level: "Easy",
    displayText: "Easy",
  },
  cuisineType: {
    type: "Asian",
    displayText: "Asian",
  },
  recipeCategory: {
    category: "Main Course",
    displayText: "Main Course",
  },

  // === Time & Servings ===
  preparationTime: {
    totalMinutes: 15,
    displayText: "15 min",
  },
  cookingTime: {
    totalMinutes: 15,
    displayText: "15 min",
  },
  totalCookTime: {
    totalMinutes: 30,
    displayText: "30 min",
  },
  servingInfo: {
    servingCount: 4,
    displayText: "4 people",
  },

  // === Ingredients ===
  ingredientsList: [
    {
      ingredientId: 1,
      ingredientText: "500g chicken breast, sliced",
      ingredientQuantity: "500",
      measurementUnit: "g",
      ingredientName: "chicken breast",
    },
    {
      ingredientId: 2,
      ingredientText: "2 bell peppers, sliced",
      ingredientQuantity: "2",
      measurementUnit: "pieces",
      ingredientName: "bell peppers",
    },
    {
      ingredientId: 3,
      ingredientText: "1 broccoli head, florets",
      ingredientQuantity: "1",
      measurementUnit: "piece",
      ingredientName: "broccoli",
    },
    {
      ingredientId: 4,
      ingredientText: "2 carrots, julienned",
      ingredientQuantity: "2",
      measurementUnit: "pieces",
      ingredientName: "carrots",
    },
    {
      ingredientId: 5,
      ingredientText: "3 tablespoons soy sauce",
      ingredientQuantity: "3",
      measurementUnit: "tablespoons",
      ingredientName: "soy sauce",
    },
    {
      ingredientId: 6,
      ingredientText: "2 tablespoons oyster sauce",
      ingredientQuantity: "2",
      measurementUnit: "tablespoons",
      ingredientName: "oyster sauce",
    },
    {
      ingredientId: 7,
      ingredientText: "1 tablespoon sesame oil",
      ingredientQuantity: "1",
      measurementUnit: "tablespoon",
      ingredientName: "sesame oil",
    },
    {
      ingredientId: 8,
      ingredientText: "2 cloves garlic, minced",
      ingredientQuantity: "2",
      measurementUnit: "cloves",
      ingredientName: "garlic",
    },
    {
      ingredientId: 9,
      ingredientText: "Fresh ginger, grated",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "ginger",
    },
  ],

  // === Instructions ===
  cookingInstructions: [
    {
      instructionStep: 1,
      instructionText:
        "Mix soy sauce, oyster sauce, and sesame oil for the sauce.",
      stepDurationMinutes: 2,
    },
    {
      instructionStep: 2,
      instructionText:
        "Heat wok over high heat with oil. Cook chicken until golden, remove and set aside.",
      stepDurationMinutes: 5,
    },
    {
      instructionStep: 3,
      instructionText:
        "Add more oil if needed. Stir-fry garlic and ginger for 30 seconds.",
      stepDurationMinutes: 1,
    },
    {
      instructionStep: 4,
      instructionText:
        "Add vegetables, starting with hardest ones (carrots, broccoli). Cook for 3–4 minutes.",
      stepDurationMinutes: 4,
    },
    {
      instructionStep: 5,
      instructionText:
        "Return chicken to wok, add bell peppers and sauce. Toss for 2 minutes.",
      stepDurationMinutes: 2,
    },
    {
      instructionStep: 6,
      instructionText: "Serve immediately over steamed rice or noodles.",
      stepDurationMinutes: 1,
    },
  ],

  // === Nutrition Facts (per serving) ===
  nutritionalInformation: {
    calories: {
      quantity: 320,
      unit: "kcal",
      displayText: "320 kcal",
    },
    protein: {
      quantity: 34,
      unit: "g",
      displayText: "34g",
    },
    carbohydrates: {
      quantity: 18,
      unit: "g",
      displayText: "18g",
    },
    fat: {
      quantity: 12,
      unit: "g",
      displayText: "12g",
    },
    fiber: {
      quantity: 5,
      unit: "g",
      displayText: "5g",
    },
    sodium: {
      quantity: 840,
      unit: "mg",
      displayText: "840mg",
    },
  },

  // === Chef's Tips ===
  chefRecommendations: [
    "Cut all ingredients before starting to cook",
    "Keep heat high for authentic stir-fry texture",
    "Don't overcrowd the wok or vegetables will steam",
    "Add cashews or peanuts for extra crunch",
  ],

  // === Additional Metadata ===
  recipeTags: ["Asian cuisine", "stir-fry", "quick meals", "healthy"],
  dietaryFlags: {
    isVegetarianFriendly: false,
    isGlutenFree: false,
    isDairyFree: true,
    isVegan: false,
  },
  recipeMetadata: {
    dateCreated: "2024-05-01",
    lastModifiedDate: "2024-05-03",
    authorName: "Chef Lin",
    difficultyRating: 1,
  },
};

const recipeData16 = {
  // === Basic Information ===
  recipeId: "recipe-017",
  recipeImageUrl: "../Images/greek-moussaka.jpg",

  // === Header ===
  header: {
    title: "Greek Moussaka",
    description: "Traditional layered eggplant casserole with lamb",
  },

  // === Rating & Reviews ===
  averageRating: {
    value: 4.8,
    displayText: "4.8",
  },
  totalReviewCount: {
    count: 234,
    displayText: "(234 reviews)",
  },

  // === Classification ===
  difficultyLevel: {
    level: "Intermediate",
    displayText: "Intermediate",
  },
  cuisineType: {
    type: "Mediterranean",
    displayText: "Mediterranean",
  },
  recipeCategory: {
    category: "Main Course",
    displayText: "Main Course",
  },

  // === Time & Servings ===
  preparationTime: {
    totalMinutes: 60,
    displayText: "60 min",
  },
  cookingTime: {
    totalMinutes: 60,
    displayText: "60 min",
  },
  totalCookTime: {
    totalMinutes: 90,
    displayText: "90 min",
  },
  servingInfo: {
    servingCount: 4,
    displayText: "4 people",
  },

  // === Ingredients ===
  ingredientsList: [
    {
      ingredientId: 1,
      ingredientText: "3 large eggplants, sliced",
      ingredientQuantity: "3",
      measurementUnit: "pieces",
      ingredientName: "eggplants",
    },
    {
      ingredientId: 2,
      ingredientText: "500g ground lamb",
      ingredientQuantity: "500",
      measurementUnit: "g",
      ingredientName: "ground lamb",
    },
    {
      ingredientId: 3,
      ingredientText: "400g canned tomatoes",
      ingredientQuantity: "400",
      measurementUnit: "g",
      ingredientName: "canned tomatoes",
    },
    {
      ingredientId: 4,
      ingredientText: "1 onion, diced",
      ingredientQuantity: "1",
      measurementUnit: "piece",
      ingredientName: "onion",
    },
    {
      ingredientId: 5,
      ingredientText: "3 cloves garlic, minced",
      ingredientQuantity: "3",
      measurementUnit: "cloves",
      ingredientName: "garlic",
    },
    {
      ingredientId: 6,
      ingredientText: "500ml béchamel sauce",
      ingredientQuantity: "500",
      measurementUnit: "ml",
      ingredientName: "béchamel sauce",
    },
    {
      ingredientId: 7,
      ingredientText: "100g parmesan cheese",
      ingredientQuantity: "100",
      measurementUnit: "g",
      ingredientName: "parmesan cheese",
    },
    {
      ingredientId: 8,
      ingredientText: "Cinnamon and oregano",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "spices",
    },
    {
      ingredientId: 9,
      ingredientText: "Olive oil",
      ingredientQuantity: "",
      measurementUnit: "",
      ingredientName: "olive oil",
    },
  ],

  // === Instructions ===
  cookingInstructions: [
    {
      instructionStep: 1,
      instructionText:
        "Slice eggplants, salt them, and let sit for 30 minutes. Rinse and pat dry.",
      stepDurationMinutes: 30,
    },
    {
      instructionStep: 2,
      instructionText:
        "Brush eggplant slices with olive oil, grill or bake until softened.",
      stepDurationMinutes: 15,
    },
    {
      instructionStep: 3,
      instructionText:
        "Cook ground lamb with onion and garlic. Add tomatoes, cinnamon, oregano. Simmer 20 minutes.",
      stepDurationMinutes: 20,
    },
    {
      instructionStep: 4,
      instructionText: "Preheat oven to 180°C (350°F).",
      stepDurationMinutes: 5,
    },
    {
      instructionStep: 5,
      instructionText:
        "Layer in baking dish: eggplant, meat sauce, eggplant, meat sauce. Top with béchamel and parmesan.",
      stepDurationMinutes: 10,
    },
    {
      instructionStep: 6,
      instructionText:
        "Bake for 45 minutes until golden. Let rest 15 minutes before serving.",
      stepDurationMinutes: 45,
    },
  ],

  // === Nutrition Facts (per serving) ===
  nutritionalInformation: {
    calories: {
      quantity: 580,
      unit: "kcal",
      displayText: "580 kcal",
    },
    protein: {
      quantity: 36,
      unit: "g",
      displayText: "36g",
    },
    carbohydrates: {
      quantity: 32,
      unit: "g",
      displayText: "32g",
    },
    fat: {
      quantity: 32,
      unit: "g",
      displayText: "32g",
    },
    fiber: {
      quantity: 8,
      unit: "g",
      displayText: "8g",
    },
    sodium: {
      quantity: 820,
      unit: "mg",
      displayText: "820mg",
    },
  },

  // === Chef's Tips ===
  chefRecommendations: [
    "Salt eggplant to remove bitterness",
    "Don't skip the resting time - it helps set the layers",
    "Use ground beef if lamb is unavailable",
    "Make ahead and reheat for easier serving",
  ],

  // === Additional Metadata ===
  recipeTags: ["Mediterranean cuisine", "Greek", "eggplant", "casserole"],
  dietaryFlags: {
    isVegetarianFriendly: false,
    isGlutenFree: false,
    isDairyFree: false,
    isVegan: false,
  },
  recipeMetadata: {
    dateCreated: "2024-05-05",
    lastModifiedDate: "2024-05-07",
    authorName: "Chef Nikos",
    difficultyRating: 3,
  },
};

// ========================================
// 3. RECIPE LIST ARRAY
// ========================================

const recipeList = [
  recipeData1,
  recipeData2,
  recipeData3,
  recipeData4,
  recipeData5,
  recipeData6,
  recipeData7,
  recipeData8,
  recipeData9,
  recipeData10,
  recipeData11,
  recipeData12,
  recipeData13,
  recipeData14,
  recipeData15,
  recipeData16,
];

// ========================================
// 4. GLOBAL VARIABLES
// ========================================

let currentRecipeIndex = 0;

// ========================================
// 5. UTILITY FUNCTIONS
// ========================================

/**
 * Generates a random recipe index
 * @returns {number} Random index between 0 and recipeList.length - 1
 */
function getRandomRecipeIndex() {
  return Math.floor(Math.random() * recipeList.length);
}

// ========================================
// 6. UPDATE FUNCTIONS
// ========================================

/**
 * Updates the recipe background image
 * @param {string} imageUrl - URL of the recipe image
 */
function updateRecipeImage(imageUrl) {
  recipeImageSection.style.backgroundImage = `url(${imageUrl})`;
  currentRecipeImageUrl = imageUrl;
}

/**
 * Updates the rating and review count
 * @param {Object} averageRating - Rating value object
 * @param {Object} totalReviewCount - Review count object
 */
function updateRecipeRating(averageRating, totalReviewCount) {
  ratingElements.value.textContent = averageRating.value;
  ratingElements.count.textContent = `(${totalReviewCount.count} reviews)`;
}

/**
 * Updates time and servings information
 * @param {Object} prepTime - Preparation time object
 * @param {Object} cookTime - Cooking time object
 * @param {Object} servings - Servings object
 */
function updateRecipeTimeAndServings(prepTime, cookTime, servings) {
  timeServingsElements.prepTime.textContent = prepTime.displayText;
  timeServingsElements.cookTime.textContent = cookTime.displayText;
  timeServingsElements.servings.textContent = servings.displayText;
}

/**
 * Updates recipe tags (difficulty and cuisine)
 * @param {Object} difficulty - Difficulty level object
 * @param {Object} cuisine - Cuisine type object
 */
function updateRecipeTags(difficulty, cuisine) {
  tagElements.difficulty.textContent = difficulty.level;
  tagElements.cuisine.textContent = cuisine.type;
}

/**
 * Updates recipe title and description
 * @param {Object} header - Header object containing title and description
 */
function updateRecipeHeader(header) {
  recipeHeaderElements.title.textContent = header.title;
  recipeHeaderElements.description.textContent = header.description;
}

/**
 * Shows or hides the preparation time alert based on recipe duration
 * Updates alert content dynamically
 * @param {Object} preparationTime - Preparation time object
 */
function updatePreparationTimeAlert(preparationTime) {
  const totalMinutes = preparationTime.totalMinutes;

  if (totalMinutes > 45) {
    // Show alert - remove d-none class
    alertElement.classList.remove("d-none");

    // Update alert content dynamically (optional)
    const alertTitle = alertElement.querySelector(".alert-title");
    const alertMessage = alertElement.querySelector(".alert-message");

    alertTitle.textContent = "Extended Preparation Time";
    alertMessage.textContent = `This recipe requires ${totalMinutes} minutes to prepare. Plan accordingly!`;
  } else {
    // Hide alert - add d-none class
    alertElement.classList.add("d-none");
  }
}

/**
 * Updates the ingredients list in the recipe display
 * @param {Array<Object>} ingredients - Array of ingredient objects
 */
function updateRecipeIngredientsList(ingredients) {
  recipeListElements.ingredients.innerHTML = "";

  ingredients.forEach((ingredient) => {
    const ingredientListItem = document.createElement("li");
    ingredientListItem.classList.add(
      "ingredient-item",
      "d-flex",
      "align-items-center",
      "mb-12"
    );

    ingredientListItem.innerHTML = `
      <span class="ingredient-number w-24 h-24 me-2 d-inline-block rounded-circle bg-secondary fs-12 fw-bold lh-13 d-flex justify-content-center align-items-center text-white">
        ${ingredient.ingredientId}
      </span>
      <span class="ingredient-text text-muted fw-medium">
        ${ingredient.ingredientText}
      </span>
    `;

    recipeListElements.ingredients.appendChild(ingredientListItem);
  });
}

/**
 * Updates the instructions list in the recipe display
 * @param {Array<Object>} instructions - Array of instruction objects
 */
function updateRecipeInstructionsList(instructions) {
  recipeListElements.instructions.innerHTML = "";

  instructions.forEach((instruction) => {
    const instructionListItem = document.createElement("li");
    instructionListItem.classList.add(
      "instruction-item",
      "d-flex",
      "align-items-center",
      "mb-4"
    );

    instructionListItem.innerHTML = `
      <span class="instruction-number w-48 h-48 me-2 d-inline-block rounded-4 bg-secondary fs-20 fw-bold lh-13 d-flex justify-content-center align-items-center text-white">
        ${instruction.instructionStep}
      </span>
      <span class="instruction-text text-muted fw-medium">
        ${instruction.instructionText}
      </span>
    `;

    recipeListElements.instructions.appendChild(instructionListItem);
  });
}

/**
 * Updates nutrition facts section
 * @param {Object} nutritionData - The nutritional information object
 */
function updateRecipeNutrition(nutritionData) {
  nutritionElements.calories.textContent = nutritionData.calories.displayText;
  nutritionElements.protein.textContent = nutritionData.protein.displayText;
  nutritionElements.carbohydrates.textContent =
    nutritionData.carbohydrates.displayText;
  nutritionElements.fiber.textContent = nutritionData.fiber.displayText;
  nutritionElements.fat.textContent = nutritionData.fat.displayText;
  nutritionElements.sodium.textContent = nutritionData.sodium.displayText;
}

/**
 * Updates the chef's tips section with new tips
 * @param {Array<string>} tipsArray - Array of chef tip strings
 */
function updateChefTips(tipsArray) {
  chefTipsSection.innerHTML = "";

  tipsArray.forEach((tip) => {
    const chefTipElement = document.createElement("div");
    chefTipElement.classList.add(
      "tip-item",
      "d-flex",
      "align-items-center",
      "gap-2",
      "border",
      "border-top-0",
      "border-end-0",
      "border-bottom-0",
      "border-5",
      "border-warning",
      "rounded-3",
      "mb-3",
      "p-3",
      "bg-sunlit"
    );

    chefTipElement.innerHTML = `
      <div class="tip-icon">
        <i class="fa-solid fa-circle-check fs-5"></i>
      </div>
      <div class="tip-content">
        <p class="tip-message fs-14 fw-medium text-muted mb-0">
          ${tip}
        </p>
      </div>
    `;

    chefTipsSection.appendChild(chefTipElement);
  });
}

// ========================================
// 7. MAIN HANDLER FUNCTION
// ========================================

/**
 * Updates the recipe display with new random data
 * @param {Event} clickEvent - The click event object
 */
function handleTryAnotherRecipe(clickEvent) {
  console.log("Loading new recipe...");

  // Get random recipe index
  currentRecipeIndex = getRandomRecipeIndex();
  console.log(`Selected recipe index: ${currentRecipeIndex}`);

  // Get current recipe
  const currentRecipe = recipeList[currentRecipeIndex];

  // Update all recipe sections
  updateRecipeImage(currentRecipe.recipeImageUrl);
  updateRecipeRating(
    currentRecipe.averageRating,
    currentRecipe.totalReviewCount
  );
  updateRecipeTimeAndServings(
    currentRecipe.preparationTime,
    currentRecipe.cookingTime,
    currentRecipe.servingInfo
  );
  updateRecipeTags(currentRecipe.difficultyLevel, currentRecipe.cuisineType);
  updateRecipeHeader(currentRecipe.header);
  updatePreparationTimeAlert(currentRecipe.preparationTime);
  updateRecipeIngredientsList(currentRecipe.ingredientsList);
  updateRecipeInstructionsList(currentRecipe.cookingInstructions);
  updateRecipeNutrition(currentRecipe.nutritionalInformation);
  updateChefTips(currentRecipe.chefRecommendations);

  console.log("✅ Recipe updated successfully!");
}

// ========================================
// 8. EVENT LISTENERS
// ========================================

// Attach event listener to the "Try Another Recipe" button
tryAnotherRecipeButton.addEventListener("click", handleTryAnotherRecipe);

// ========================================
// 9. INITIALIZATION (Optional)
// ========================================

/**
 * Initializes the page with the first recipe on load
 */
function initializePage() {
  console.log("🍽️ Initializing recipe page...");

  // Load first recipe by default
  currentRecipeIndex = 0;
  const firstRecipe = recipeList[currentRecipeIndex];

  updateRecipeImage(firstRecipe.recipeImageUrl);
  updateRecipeRating(firstRecipe.averageRating, firstRecipe.totalReviewCount);

  console.log(firstRecipe.averageRating, firstRecipe.totalReviewCount);

  updateRecipeTimeAndServings(
    firstRecipe.preparationTime,
    firstRecipe.cookingTime,
    firstRecipe.servingInfo
  );
  updateRecipeTags(firstRecipe.difficultyLevel, firstRecipe.cuisineType);
  updateRecipeHeader(firstRecipe.header);
  updateRecipeIngredientsList(firstRecipe.ingredientsList);
  updateRecipeInstructionsList(firstRecipe.cookingInstructions);
  updateRecipeNutrition(firstRecipe.nutritionalInformation);
  updateChefTips(firstRecipe.chefRecommendations);

  console.log("✅ Page initialized with first recipe!");
}

// Call initialization when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePage);
