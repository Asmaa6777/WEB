from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout


def signup_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")

        if User.objects.filter(username=username).exists():
            return render(request, "accounts/signup.html", {
                "error": "Username already exists"
            })

        User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        return redirect("login")

    return render(request, "accounts/signup.html")


def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user is not None:
            login(request, user)
            return redirect("login")

    return render(request, "accounts/login.html")


def logout_view(request):
    logout(request)
    return redirect("login")