document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!isLoggedIn) {
        window.location.href = "/login"; // Redirect to login page
    } else {
        const welcomeMessage = document.createElement("h2");
        welcomeMessage.textContent = `Welcome, ${currentUser.email}`;
        document.body.insertBefore(welcomeMessage, document.body.firstChild);
    }

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("currentUser");
        window.location.href = "/login"; // Redirect to login page
    });
});
