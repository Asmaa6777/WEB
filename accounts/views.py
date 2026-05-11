from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth import get_user_model

# Fetch the custom user model defined in settings.py
User = get_user_model()

def signup_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        
        # You can also capture 'role', 'first_name', 'last_name', and 'dob' here if needed
        User.objects.create_user(username=username, email=email, password=password)
        messages.success(request, "Account created successfully! Please login.")
        return redirect("login")

    return render(request, "accounts/signup.html")

def login_view(request):
    if request.method == "POST":
        username = request.POST.get("loginIdentifier") 
        password = request.POST.get("loginPassword")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect("profile") # Redirecting to profile instead of "/" for now
        else:
            messages.error(request, "Invalid username or password.")

    return render(request, "accounts/login.html")

def logout_view(request):
    logout(request)
    return redirect("login")

# --- New Profile View ---
@login_required(login_url='login') # Redirect to login if the user is not authenticated
def profile_view(request):
    user = request.user

    if request.method == "POST":
        user.username = request.POST.get("username", user.username)
        user.email = request.POST.get("email", user.email)
        user.dob = request.POST.get("dob", user.dob)

        new_password = request.POST.get("password")
        if new_password:
            user.set_password(new_password)

        user.save()
        messages.success(request, "Profile updated successfully!")
        return redirect("profile")

    if getattr(user, 'role', 'user') == 'admin':
        return render(request, "accounts/admin-profile.html", {"user": user})
    else:
        return render(request, "accounts/user-profile.html", {"user": user})
