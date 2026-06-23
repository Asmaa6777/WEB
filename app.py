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
        "image": "carbonara.jpg",
        "description": "Silky Roman pasta with crispy pancetta and a creamy egg-and-parmesan sauce.",
        "ingredients": ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Black pepper", "Salt"],
        "steps": ["Boil pasta.", "Crisp pancetta.", "Mix eggs and parmesan.", "Toss everything off the heat."],
    },
    {
        "name": "Avocado Toast",
        "category": "Breakfast",
        "cuisine": "Modern",
        "difficulty": "Easy",
        "time": 10,
        "image": "avocado_toast.jpg",
        "description": "Creamy smashed avocado on crispy sourdough with lemon and chili flakes.",
        "ingredients": ["Sourdough", "Avocado", "Lemon", "Chili flakes", "Olive oil", "Salt"],
        "steps": ["Toast bread.", "Mash avocado with lemon.", "Spread and season."],
    },
    {
        "name": "Butter Chicken",
        "category": "Main Course",
        "cuisine": "Indian",
        "difficulty": "Medium",
        "time": 55,
        "image": "butter_chicken.jpg",
        "description": "Tender chicken in a rich tomato, butter, cream, garlic, and garam masala sauce.",
        "ingredients": ["Chicken", "Butter", "Tomato puree", "Cream", "Garlic", "Garam masala"],
        "steps": ["Marinate chicken.", "Cook chicken.", "Simmer sauce.", "Combine and serve."],
    },
    {
        "name": "Caprese Salad",
        "category": "Appetizer",
        "cuisine": "Italian",
        "difficulty": "Easy",
        "time": 12,
        "image": "caprese.jpg",
        "description": "Fresh mozzarella, tomatoes, basil, olive oil, and balsamic glaze.",
        "ingredients": ["Mozzarella", "Tomatoes", "Basil", "Olive oil", "Balsamic glaze"],
        "steps": ["Slice tomatoes and mozzarella.", "Layer with basil.", "Drizzle and serve."],
    },
    {
        "name": "Chocolate Lava Cake",
        "category": "Dessert",
        "cuisine": "French",
        "difficulty": "Medium",
        "time": 25,
        "image": "lava_cake.jpg",
        "description": "Warm chocolate cake with a soft molten center.",
        "ingredients": ["Dark chocolate", "Butter", "Eggs", "Sugar", "Flour"],
        "steps": ["Melt chocolate and butter.", "Mix batter.", "Bake briefly.", "Serve warm."],
    },
    {
        "name": "Salmon Poke Bowl",
        "category": "Main Course",
        "cuisine": "Hawaiian",
        "difficulty": "Easy",
        "time": 25,
        "image": "poke_bowl.jpg",
        "description": "A colorful bowl with salmon, sushi rice, avocado, cucumber, edamame, and sesame.",
        "ingredients": ["Salmon", "Sushi rice", "Avocado", "Cucumber", "Edamame", "Soy sauce"],
        "steps": ["Cook rice.", "Marinate salmon.", "Slice vegetables.", "Build the bowl."],
    },
    {
        "name": "Bruschetta",
        "category": "Appetizer",
        "cuisine": "Italian",
        "difficulty": "Easy",
        "time": 15,
        "image": "bruschetta.jpg",
        "description": "Toasted baguette topped with juicy tomatoes, basil, garlic, olive oil, and balsamic.",
        "ingredients": ["Baguette", "Tomatoes", "Basil", "Garlic", "Olive oil", "Balsamic"],
        "steps": ["Toast bread.", "Mix tomato topping.", "Rub with garlic.", "Spoon topping on toast."],
    },
    {
        "name": "Beef Tacos",
        "category": "Main Course",
        "cuisine": "Mexican",
        "difficulty": "Easy",
        "time": 25,
        "image": "tacos.jpg",
        "description": "Crispy tacos loaded with spiced beef, avocado, salsa, cheese, cilantro, and lime.",
        "ingredients": ["Tortillas", "Ground beef", "Avocado", "Salsa", "Lime", "Cheese"],
        "steps": ["Cook beef.", "Warm tortillas.", "Add toppings.", "Serve with lime."],
    },
]


DEMO_USERS = {
    "user@recipefinder.com": {"password": "user123", "role": "User", "name": "Recipe User"},
    "admin@recipefinder.com": {"password": "admin123", "role": "Admin", "name": "Recipe Admin"},
}


def format_time(minutes: int) -> str:
    if minutes < 60:
        return f"{minutes} min"
    hours, mins = divmod(minutes, 60)
    return f"{hours} hr {mins} min" if mins else f"{hours} hr"


def image_path(recipe: dict) -> str:
    path = IMAGE_DIR / recipe["image"]
    fallback = IMAGE_DIR / "placeholder.svg"
    return str(path if path.exists() else fallback)


def init_state() -> None:
    defaults = {
        "page": "Home",
        "authenticated": False,
        "user_email": "",
        "user_name": "",
        "user_role": "",
        "saved_recipes": [],
    }
    for key, value in defaults.items():
        st.session_state.setdefault(key, value)


def login(email: str, password: str) -> bool:
    account = DEMO_USERS.get(email.lower().strip())
    if not account or account["password"] != password:
        return False
    st.session_state.authenticated = True
    st.session_state.user_email = email.lower().strip()
    st.session_state.user_name = account["name"]
    st.session_state.user_role = account["role"]
    st.session_state.page = "Admin Dashboard" if account["role"] == "Admin" else "User Dashboard"
    return True


def logout() -> None:
    st.session_state.authenticated = False
    st.session_state.user_email = ""
    st.session_state.user_name = ""
    st.session_state.user_role = ""
    st.session_state.page = "Home"


def set_page(page: str) -> None:
    st.session_state.page = page
    st.rerun()


st.set_page_config(page_title="Recipe Finder", page_icon="RF", layout="wide")

st.markdown(
    """
    <style>
    .stApp {
        background: radial-gradient(circle at top left, rgba(220, 38, 38, .17), transparent 30%),
                    radial-gradient(circle at bottom right, rgba(249, 115, 22, .12), transparent 34%),
                    #080808;
        color: #fff7ed;
    }
    section[data-testid="stSidebar"] {
        background: #0f0f0f;
        border-right: 1px solid rgba(239, 68, 68, .28);
    }
    h1, h2, h3, p, label, .stMarkdown, .stCaption {
        color: #fff7ed;
    }
    .hero {
        padding: 2.2rem;
        border-radius: 28px;
        background: linear-gradient(135deg, #111111, #2a0f0f 48%, #7f1d1d);
        border: 1px solid rgba(239, 68, 68, .55);
        box-shadow: 0 20px 55px rgba(0, 0, 0, .45);
        margin-bottom: 1.5rem;
    }
    .hero h1 {
        font-size: clamp(2.5rem, 7vw, 5.4rem);
        margin: 0;
        line-height: .95;
        letter-spacing: -0.08em;
    }
    .hero p {
        font-size: 1.08rem;
        max-width: 780px;
        margin-top: 1rem;
        color: #ffe4e6;
    }
    .metric-card, .panel, .recipe-card {
        border-radius: 22px;
        background: rgba(15, 15, 15, .94);
        border: 1px solid rgba(239, 68, 68, .38);
        box-shadow: 0 14px 35px rgba(0, 0, 0, .36);
    }
    .metric-card {
        padding: 1rem;
        text-align: center;
    }
    .panel {
        padding: 1.25rem;
        min-height: 150px;
    }
    .recipe-card {
        padding: 1rem 1rem 1.2rem;
        height: 100%;
    }
    .recipe-title {
        font-size: 1.3rem;
        font-weight: 800;
        color: #fff7ed;
        margin: .7rem 0 .25rem;
    }
    .recipe-meta, .muted {
        color: #fca5a5;
        font-size: .92rem;
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


def hero() -> None:
    st.markdown(
        """
        <section class="hero">
            <h1>Recipe Finder</h1>
            <p>
                Discover recipes, create an account, log in as a user, and preview
                admin tools for managing recipes. This Streamlit version keeps the
                original project flow while staying easy to deploy.
            </p>
        </section>
        """,
        unsafe_allow_html=True,
    )


def metrics() -> None:
    cols = st.columns(4)
    data = [
        ("Recipes", len(RECIPES)),
        ("Categories", len({recipe["category"] for recipe in RECIPES})),
        ("Demo users", len(DEMO_USERS)),
        ("Dashboards", 2),
    ]
    for col, (label, value) in zip(cols, data):
        col.markdown(
            f'<div class="metric-card"><div style="font-size:2rem;font-weight:900;">{value}</div><div class="muted">{label}</div></div>',
            unsafe_allow_html=True,
        )


def recipe_browser(admin_mode: bool = False) -> None:
    with st.sidebar:
        st.header("Recipe filters")
        search = st.text_input("Search by name or ingredient", placeholder="Try chicken, avocado, chocolate...")
        category = st.selectbox("Category", ["All"] + sorted({recipe["category"] for recipe in RECIPES}))
        cuisine = st.selectbox("Cuisine", ["All"] + sorted({recipe["cuisine"] for recipe in RECIPES}))
        difficulty = st.selectbox("Difficulty", ["All", "Easy", "Medium", "Hard"])
        max_time = st.slider("Maximum total time", 10, 300, 300, step=5)

    query = search.lower().strip()
    filtered = []
    for recipe in RECIPES:
        searchable = " ".join([recipe["name"], recipe["description"], recipe["category"], recipe["cuisine"], *recipe["ingredients"]]).lower()
        if query and query not in searchable:
            continue
        if category != "All" and recipe["category"] != category:
            continue
        if cuisine != "All" and recipe["cuisine"] != cuisine:
            continue
        if difficulty != "All" and recipe["difficulty"] != difficulty:
            continue
        if recipe["time"] > max_time:
            continue
        filtered.append(recipe)

    st.subheader(f"{len(filtered)} recipe{'s' if len(filtered) != 1 else ''} found")
    if not filtered:
        st.info("No recipes matched your filters.")

    for start in range(0, len(filtered), 3):
        cols = st.columns(3)
        for col, recipe in zip(cols, filtered[start : start + 3]):
            with col:
                st.markdown('<div class="recipe-card">', unsafe_allow_html=True)
                st.image(image_path(recipe), width="stretch")
                st.markdown(f'<div class="recipe-title">{recipe["name"]}</div>', unsafe_allow_html=True)
                st.markdown(
                    f'<div class="recipe-meta">{recipe["category"]} · {recipe["cuisine"]} · {format_time(recipe["time"])} · {recipe["difficulty"]}</div>',
                    unsafe_allow_html=True,
                )
                st.write(recipe["description"])
                st.markdown(f'<span class="tag">{recipe["category"]}</span><span class="tag">{recipe["difficulty"]}</span>', unsafe_allow_html=True)

                if st.session_state.authenticated and not admin_mode:
                    if st.button("Save recipe", key=f"save-{recipe['name']}", use_container_width=True):
                        if recipe["name"] not in st.session_state.saved_recipes:
                            st.session_state.saved_recipes.append(recipe["name"])
                            st.success("Saved.")

                if admin_mode:
                    admin_cols = st.columns(2)
                    admin_cols[0].button("Edit", key=f"edit-{recipe['name']}", use_container_width=True)
                    admin_cols[1].button("Delete", key=f"delete-{recipe['name']}", use_container_width=True)

                with st.expander("Ingredients and steps"):
                    st.markdown("**Ingredients**")
                    for item in recipe["ingredients"]:
                        st.markdown(f"- {item}")
                    st.markdown("**Steps**")
                    for number, step in enumerate(recipe["steps"], start=1):
                        st.markdown(f"{number}. {step}")
                st.markdown("</div>", unsafe_allow_html=True)


def home_page() -> None:
    hero()
    metrics()
    st.write("")
    cols = st.columns(3)
    cards = [
        ("Login page", "Sign in as a user or admin and enter the correct dashboard.", "Login"),
        ("Sign-up page", "Create a demo user account for this Streamlit session.", "Sign Up"),
        ("Admin preview", "Open the admin dashboard with recipe management controls.", "Admin Dashboard"),
    ]
    for col, (title, body, target) in zip(cols, cards):
        with col:
            st.markdown(f'<div class="panel"><h3>{title}</h3><p class="muted">{body}</p></div>', unsafe_allow_html=True)
            if st.button(f"Open {title}", key=f"home-{title}", use_container_width=True):
                if target == "Admin Dashboard":
                    login("admin@recipefinder.com", "admin123")
                else:
                    st.session_state.page = target
                st.rerun()


def login_page() -> None:
    hero()
    st.subheader("Login")
    st.caption("Demo accounts: user@recipefinder.com / user123, admin@recipefinder.com / admin123")
    with st.form("login-form"):
        email = st.text_input("Email")
        password = st.text_input("Password", type="password")
        submitted = st.form_submit_button("Login", use_container_width=True)
    if submitted:
        if login(email, password):
            st.success("Logged in successfully.")
            st.rerun()
        st.error("Invalid email or password.")


def signup_page() -> None:
    hero()
    st.subheader("Sign Up")
    with st.form("signup-form"):
        name = st.text_input("Full name")
        email = st.text_input("Email")
        password = st.text_input("Password", type="password")
        confirm = st.text_input("Confirm password", type="password")
        submitted = st.form_submit_button("Create account", use_container_width=True)
    if submitted:
        if not name or not email or not password:
            st.error("Please fill in all fields.")
        elif password != confirm:
            st.error("Passwords do not match.")
        else:
            st.session_state.authenticated = True
            st.session_state.user_email = email
            st.session_state.user_name = name
            st.session_state.user_role = "User"
            st.session_state.page = "User Dashboard"
            st.success("Account created for this demo session.")
            st.rerun()


def user_dashboard() -> None:
    st.title("User Dashboard")
    st.markdown(f"Welcome, **{st.session_state.user_name or 'Recipe User'}**. Search recipes and save favorites.")
    if st.session_state.saved_recipes:
        st.info("Saved recipes: " + ", ".join(st.session_state.saved_recipes))
    recipe_browser(admin_mode=False)


def admin_dashboard() -> None:
    st.title("Admin Dashboard")
    st.markdown("Preview admin tools for managing recipes and users.")
    cols = st.columns(3)
    cols[0].metric("Total recipes", len(RECIPES))
    cols[1].metric("Registered users", len(DEMO_USERS))
    cols[2].metric("Pending reviews", 2)
    with st.expander("Add recipe demo form"):
        st.text_input("Recipe name")
        st.selectbox("Category", sorted({recipe["category"] for recipe in RECIPES}))
        st.text_area("Description")
        st.button("Save recipe demo", use_container_width=True)
    recipe_browser(admin_mode=True)


init_state()

with st.sidebar:
    st.title("Recipe Finder")
    pages = ["Home", "Recipe Finder", "Login", "Sign Up"]
    if st.session_state.authenticated:
        pages.append("User Dashboard")
        if st.session_state.user_role == "Admin":
            pages.append("Admin Dashboard")
    if st.session_state.page not in pages:
        pages.append(st.session_state.page)
    st.session_state.page = st.radio("Navigation", pages, index=pages.index(st.session_state.page))
    if st.session_state.authenticated:
        st.success(f"{st.session_state.user_role}: {st.session_state.user_email}")
        if st.button("Log out", use_container_width=True):
            logout()
            st.rerun()


if st.session_state.page == "Home":
    home_page()
elif st.session_state.page == "Recipe Finder":
    hero()
    recipe_browser(admin_mode=False)
elif st.session_state.page == "Login":
    login_page()
elif st.session_state.page == "Sign Up":
    signup_page()
elif st.session_state.page == "User Dashboard":
    if st.session_state.authenticated:
        user_dashboard()
    else:
        st.warning("Please log in first.")
        login_page()
elif st.session_state.page == "Admin Dashboard":
    if st.session_state.authenticated and st.session_state.user_role == "Admin":
        admin_dashboard()
    else:
        st.warning("Admin access required.")
        login_page()

st.caption("Streamlit deployable demo of the Recipe Finder project: login, sign-up, user dashboard, admin dashboard, and recipe browsing.")
