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
        confirm_password = request.POST.get("confirmPassword") # من كود رهف

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect("signup")

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
            return redirect("signup")

        user = User.objects.create_user(username=username, email=email, password=password)
        user.role = 'user' 
        user.save()

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
            return redirect("profile")
        else:
            messages.error(request, "Invalid username or password.")

    return render(request, "accounts/login.html")

def logout_view(request):
    logout(request)
    return redirect("login")

# --- Profile View ---
@login_required(login_url='login') 
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
        return render(request, "accounts/profile.html", {"user": user})