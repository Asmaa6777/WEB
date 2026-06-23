from pathlib import Path

import streamlit as st


BASE_DIR = Path(__file__).parent
IMAGE_DIR = BASE_DIR / "static" / "images"


RECIPES = [
    {
        "name": "Spaghetti Carbonara",
        "category": "Main Course",
        "cuisine": "Italian",
        "difficulty": "Medium",
        "time": 30,
        "servings": 4,
        "image": "carbonara.jpg",
        "description": "Silky Roman pasta with crispy pancetta and a creamy egg-and-parmesan sauce.",
        "ingredients": ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Black pepper", "Salt"],
        "steps": [
            "Boil spaghetti in salted water until al dente.",
            "Fry pancetta until crispy.",
            "Whisk eggs and parmesan together.",
            "Toss hot pasta with pancetta, then mix in the egg sauce off the heat.",
        ],
        "tags": ["Quick", "Comfort food"],
    },
    {
        "name": "Avocado Toast",
        "category": "Breakfast",
        "cuisine": "Modern",
        "difficulty": "Easy",
        "time": 10,
        "servings": 2,
        "image": "avocado_toast.jpg",
        "description": "Creamy smashed avocado on crispy sourdough with lemon and chili flakes.",
        "ingredients": ["Sourdough bread", "Avocado", "Lemon", "Chili flakes", "Olive oil", "Salt"],
        "steps": [
            "Toast the sourdough until golden.",
            "Mash avocado with lemon juice and salt.",
            "Spread onto toast and finish with olive oil and chili flakes.",
        ],
        "tags": ["Vegetarian", "Quick"],
    },
    {
        "name": "Strawberry Cheesecake",
        "category": "Dessert",
        "cuisine": "American",
        "difficulty": "Medium",
        "time": 260,
        "servings": 8,
        "image": "cheesecake.jpg",
        "description": "Velvety cheesecake with a buttery biscuit base and fresh strawberries.",
        "ingredients": ["Cream cheese", "Strawberries", "Digestive biscuits", "Butter", "Sugar", "Vanilla"],
        "steps": [
            "Mix crushed biscuits with melted butter and press into a pan.",
            "Beat cream cheese, sugar, and vanilla until smooth.",
            "Chill until set, then top with strawberries.",
        ],
        "tags": ["Sweet", "Make ahead"],
    },
    {
        "name": "Butter Chicken",
        "category": "Main Course",
        "cuisine": "Indian",
        "difficulty": "Medium",
        "time": 55,
        "servings": 4,
        "image": "butter_chicken.jpg",
        "description": "Tender chicken in a rich tomato, butter, cream, garlic, and garam masala sauce.",
        "ingredients": ["Chicken", "Butter", "Tomato puree", "Heavy cream", "Garlic", "Garam masala", "Ginger"],
        "steps": [
            "Marinate chicken with yogurt and spices.",
            "Cook chicken until browned.",
            "Simmer tomato puree, butter, garlic, ginger, and garam masala.",
            "Add cream and chicken, then simmer until glossy.",
        ],
        "tags": ["Dinner", "Comfort food"],
    },
    {
        "name": "Caprese Salad",
        "category": "Appetizer",
        "cuisine": "Italian",
        "difficulty": "Easy",
        "time": 12,
        "servings": 4,
        "image": "caprese.jpg",
        "description": "Fresh mozzarella, ripe tomatoes, basil, olive oil, and balsamic glaze.",
        "ingredients": ["Fresh mozzarella", "Tomatoes", "Basil", "Olive oil", "Balsamic glaze", "Salt"],
        "steps": [
            "Slice mozzarella and tomatoes.",
            "Layer them with fresh basil.",
            "Drizzle with olive oil and balsamic glaze.",
        ],
        "tags": ["Vegetarian", "Fresh"],
    },
    {
        "name": "Chocolate Lava Cake",
        "category": "Dessert",
        "cuisine": "French",
        "difficulty": "Medium",
        "time": 25,
        "servings": 4,
        "image": "lava_cake.jpg",
        "description": "Warm chocolate cake with a soft molten center.",
        "ingredients": ["Dark chocolate", "Butter", "Eggs", "Sugar", "Flour", "Vanilla"],
        "steps": [
            "Melt chocolate and butter.",
            "Whisk eggs, sugar, and vanilla.",
            "Fold in chocolate and flour.",
            "Bake briefly so the center stays molten.",
        ],
        "tags": ["Sweet", "Chocolate"],
    },
    {
        "name": "Salmon Poke Bowl",
        "category": "Main Course",
        "cuisine": "Hawaiian",
        "difficulty": "Easy",
        "time": 25,
        "servings": 2,
        "image": "poke_bowl.jpg",
        "description": "A colorful bowl with salmon, sushi rice, avocado, cucumber, edamame, and sesame.",
        "ingredients": ["Salmon", "Sushi rice", "Avocado", "Cucumber", "Edamame", "Soy sauce", "Sesame oil"],
        "steps": [
            "Cook and season sushi rice.",
            "Dice salmon and marinate with soy sauce and sesame oil.",
            "Assemble rice, salmon, avocado, cucumber, and edamame.",
        ],
        "tags": ["Fresh", "High protein"],
    },
    {
        "name": "Bruschetta",
        "category": "Appetizer",
        "cuisine": "Italian",
        "difficulty": "Easy",
        "time": 15,
        "servings": 6,
        "image": "bruschetta.jpg",
        "description": "Toasted baguette topped with juicy tomatoes, basil, garlic, olive oil, and balsamic.",
        "ingredients": ["Baguette", "Tomatoes", "Basil", "Garlic", "Olive oil", "Balsamic"],
        "steps": [
            "Toast sliced baguette until crisp.",
            "Mix tomatoes, basil, olive oil, balsamic, and salt.",
            "Rub toast with garlic and spoon tomato mixture on top.",
        ],
        "tags": ["Vegetarian", "Party food"],
    },
    {
        "name": "Crème Brûlée",
        "category": "Dessert",
        "cuisine": "French",
        "difficulty": "Hard",
        "time": 180,
        "servings": 6,
        "image": "creme_brulee.jpg",
        "description": "Silky vanilla custard finished with a crisp caramelized sugar crust.",
        "ingredients": ["Heavy cream", "Egg yolks", "Sugar", "Vanilla bean"],
        "steps": [
            "Warm cream with vanilla.",
            "Whisk yolks and sugar, then slowly add warm cream.",
            "Bake in a water bath and chill.",
            "Torch sugar on top until caramelized.",
        ],
        "tags": ["Sweet", "Elegant"],
    },
    {
        "name": "Beef Tacos",
        "category": "Main Course",
        "cuisine": "Mexican",
        "difficulty": "Easy",
        "time": 25,
        "servings": 4,
        "image": "tacos.jpg",
        "description": "Crispy tacos loaded with spiced beef, avocado, salsa, cheese, cilantro, and lime.",
        "ingredients": ["Corn tortillas", "Ground beef", "Avocado", "Salsa", "Lime", "Cilantro", "Cheese"],
        "steps": [
            "Brown beef with taco seasoning.",
            "Warm tortillas.",
            "Fill with beef, avocado, salsa, cheese, and cilantro.",
            "Serve with lime wedges.",
        ],
        "tags": ["Dinner", "Quick"],
    },
]


def format_time(minutes: int) -> str:
    if minutes < 60:
        return f"{minutes} min"
    hours, mins = divmod(minutes, 60)
    return f"{hours} hr {mins} min" if mins else f"{hours} hr"


def image_path(recipe: dict) -> Path:
    path = IMAGE_DIR / recipe["image"]
    return path if path.exists() else IMAGE_DIR / "placeholder.svg"


st.set_page_config(
    page_title="Recipe Finder",
    page_icon="🍽️",
    layout="wide",
)

st.markdown(
    """
    <style>
    .stApp {
        background: radial-gradient(circle at top left, rgba(220, 38, 38, .16), transparent 32%),
                    radial-gradient(circle at bottom right, rgba(249, 115, 22, .14), transparent 34%),
                    #080808;
        color: #fff7ed;
    }
    section[data-testid="stSidebar"] {
        background: #0f0f0f;
        border-right: 1px solid rgba(239, 68, 68, .28);
    }
    h2, h3, label, .stMarkdown, .stCaption {
        color: #fff7ed;
    }
    .hero {
        padding: 2.2rem;
        border-radius: 28px;
        background: linear-gradient(135deg, #151515, #2a0f0f 48%, #7f1d1d);
        color: white;
        border: 1px solid rgba(239, 68, 68, .55);
        box-shadow: 0 20px 55px rgba(0, 0, 0, .45);
        margin-bottom: 1.5rem;
    }
    .hero h1 {
        font-size: clamp(2.4rem, 7vw, 5.3rem);
        margin: 0;
        line-height: .95;
        letter-spacing: -0.08em;
    }
    .hero p {
        font-size: 1.1rem;
        max-width: 760px;
        margin-top: 1rem;
        color: #ffe4e6;
    }
    .metric-card {
        padding: 1rem;
        border-radius: 18px;
        background: rgba(18, 18, 18, .9);
        border: 1px solid rgba(239, 68, 68, .42);
        text-align: center;
        box-shadow: 0 14px 35px rgba(0, 0, 0, .25);
    }
    .recipe-card {
        border-radius: 22px;
        background: rgba(15, 15, 15, .94);
        border: 1px solid rgba(239, 68, 68, .38);
        padding: 1rem 1rem 1.2rem;
        box-shadow: 0 14px 35px rgba(0, 0, 0, .36);
        height: 100%;
    }
    .recipe-title {
        font-size: 1.35rem;
        font-weight: 800;
        color: #fff7ed;
        margin: .7rem 0 .25rem;
    }
    .recipe-meta {
        color: #fca5a5;
        font-size: .92rem;
        margin-bottom: .55rem;
    }
    .tag {
        display: inline-block;
        padding: .25rem .55rem;
        border-radius: 999px;
        background: rgba(127, 29, 29, .72);
        border: 1px solid rgba(248, 113, 113, .35);
        color: #fecaca;
        margin: .12rem;
        font-size: .78rem;
        font-weight: 700;
    }
    [data-testid="stExpander"] {
        background: rgba(8, 8, 8, .72);
        border-radius: 16px;
        border: 1px solid rgba(239, 68, 68, .28);
    }
    </style>
    """,
    unsafe_allow_html=True,
)

st.markdown(
    """
    <section class="hero">
        <h1>Recipe Finder</h1>
        <p>
            Search, filter, and explore a curated set of recipes by category, cuisine,
            difficulty, and ingredients. A clean Streamlit demo inspired by the original
            Django team project.
        </p>
    </section>
    """,
    unsafe_allow_html=True,
)

metric_cols = st.columns(4)
metrics = [
    ("Recipes", len(RECIPES)),
    ("Categories", len({recipe["category"] for recipe in RECIPES})),
    ("Cuisines", len({recipe["cuisine"] for recipe in RECIPES})),
    ("Quick meals", len([recipe for recipe in RECIPES if recipe["time"] <= 30])),
]
for col, (label, value) in zip(metric_cols, metrics):
    col.markdown(
        f'<div class="metric-card"><div style="font-size:2rem;font-weight:900;color:#fff7ed;">{value}</div><div style="color:#fca5a5;">{label}</div></div>',
        unsafe_allow_html=True,
    )

st.write("")

with st.sidebar:
    st.header("Find your recipe")
    search = st.text_input("Search by name or ingredient", placeholder="Try avocado, chicken, chocolate...")
    category = st.selectbox("Category", ["All"] + sorted({recipe["category"] for recipe in RECIPES}))
    cuisine = st.selectbox("Cuisine", ["All"] + sorted({recipe["cuisine"] for recipe in RECIPES}))
    difficulty = st.selectbox("Difficulty", ["All", "Easy", "Medium", "Hard"])
    max_time = st.slider("Maximum total time", 10, 300, 300, step=5)

query = search.lower().strip()
filtered_recipes = []
for recipe in RECIPES:
    searchable_text = " ".join(
        [recipe["name"], recipe["description"], recipe["category"], recipe["cuisine"], *recipe["ingredients"], *recipe["tags"]]
    ).lower()
    if query and query not in searchable_text:
        continue
    if category != "All" and recipe["category"] != category:
        continue
    if cuisine != "All" and recipe["cuisine"] != cuisine:
        continue
    if difficulty != "All" and recipe["difficulty"] != difficulty:
        continue
    if recipe["time"] > max_time:
        continue
    filtered_recipes.append(recipe)

st.subheader(f"{len(filtered_recipes)} recipe{'s' if len(filtered_recipes) != 1 else ''} found")

if not filtered_recipes:
    st.info("No recipes matched your filters. Try making the search a little broader.")

for row_start in range(0, len(filtered_recipes), 3):
    cols = st.columns(3)
    for col, recipe in zip(cols, filtered_recipes[row_start : row_start + 3]):
        with col:
            with st.container(border=False):
                st.markdown('<div class="recipe-card">', unsafe_allow_html=True)
                st.image(str(image_path(recipe)), width="stretch")
                st.markdown(f'<div class="recipe-title">{recipe["name"]}</div>', unsafe_allow_html=True)
                st.markdown(
                    f'<div class="recipe-meta">{recipe["category"]} · {recipe["cuisine"]} · {format_time(recipe["time"])} · {recipe["difficulty"]}</div>',
                    unsafe_allow_html=True,
                )
                st.write(recipe["description"])
                st.markdown("".join(f'<span class="tag">{tag}</span>' for tag in recipe["tags"]), unsafe_allow_html=True)
                with st.expander("View ingredients and steps"):
                    st.markdown("**Ingredients**")
                    for ingredient in recipe["ingredients"]:
                        st.markdown(f"- {ingredient}")
                    st.markdown("**Steps**")
                    for number, step in enumerate(recipe["steps"], start=1):
                        st.markdown(f"{number}. {step}")
                st.markdown("</div>", unsafe_allow_html=True)

st.caption("Built with Streamlit as a portfolio-ready demo version of the Recipe Finder web project.")
