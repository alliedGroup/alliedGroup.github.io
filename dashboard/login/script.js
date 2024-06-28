document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    // Predefined users (for demonstration purposes)
    const users = [
        { email: "user99", password: "1234" },
        { email: "user2@example.com", password: "password456" }
    ];

    // Save users to localStorage (only once for demo purposes)
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(users));
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const storedUsers = JSON.parse(localStorage.getItem("users"));

        const user = storedUsers.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "/"; // Redirect to dashboard
        } else {
            alert("Invalid email or password.");
        }
    });
});
