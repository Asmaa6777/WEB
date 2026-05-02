# Django Architectural Blueprint: Recipe Finder

This document defines the structural design for the Recipe Finder Django migration.

## 1. Comprehensive Project Structure

```text
WEB/
├── manage.py
├── config/                  # Main Project Settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── accounts/                # Identity & Security
│   ├── models.py            # ← CustomUser (Email login), Profile
│   ├── views.py             # ← Login, Signup, Logout, ProfileView
│   ├── forms.py             # ← UserRegistrationForm, UserEditForm
│   ├── urls.py
│   └── templates/accounts/
│       ├── login.html
│       ├── signup.html
│       └── profile.html
├── recipes/                 # Culinary Content
│   ├── models.py            # ← Recipe, Category (Course)
│   ├── views.py             # ← Home, RecipeList, RecipeDetail, Search
│   ├── urls.py
│   └── templates/recipes/
│       ├── homepage.html
│       ├── recipes.html
│       ├── recipe_detail.html
│       └── search_results.html
├── social/                  # Engagement Features
│   ├── models.py            # ← Favorite, Review/Comment (Planned)
│   ├── views.py             # ← ToggleFavorite (AJAX), TrendingView
│   ├── urls.py
│   └── templates/social/
│       ├── favorites.html
│       └── trending.html
├── management/              # Staff Branded Dashboard
│   ├── views.py             # ← AdminDashboard, UserManage, RecipeManage
│   ├── forms.py             # ← RecipeForm (for CRUD)
│   ├── urls.py
│   └── templates/mgmt/
│       ├── admin_dashboard.html
│       ├── users.html
│       ├── recipe_manage.html
│       └── recipe_form.html
├── static/                  # Shared Static Assets
│   ├── css/                 # ← home.css, navbar.css, style.css, etc.
│   ├── js/                  # ← navbar.js, home.js, admin_users.js, etc.
│   └── images/              # ← Recipe JPGs/WebP, placeholder.svg
├── templates/               # Global Layouts
│   └── base.html            # ← Shared Master Template (Navbar/Footer)
└── media/                   # User-Uploaded Recipe Photos
```

---

## 2. App Responsibilities & Design Justification

### Why a Separate `social` App?
The `social` app sits between **Accounts** and **Recipes** as a dedicated bridge.
1.  **Circular Dependency Prevention**: It prevents `accounts` and `recipes` from importing each other directly, which would crash Django.
2.  **Scalability**: We can add "Comments" or "Ratings" later without cluttering the recipe data.
3.  **Performance**: We can optimize high-frequency "Like" actions separately from heavy content loading.

### App Summary:
*   **`accounts`**: Handles secure authentication and custom user roles.
*   **`recipes`**: The "Source of Truth" for all ingredients, steps, and culinary data.
*   **`management`**: A custom-themed control center for admins to manage the community.
*   **`social`**: Manages the emotional connection (Favorites/Trending) between users and food.

---

## 3. Developer Standards
*   **DRY (Don't Repeat Yourself)**: Use `base.html` for all global UI.
*   **Surgical Edits**: Move CSS/JS to the root `static/` to keep apps lean.
*   **Security**: Use Django's built-in Auth but override with the `CustomUser` model for Email-based login.
