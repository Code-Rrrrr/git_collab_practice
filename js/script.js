// Simple Coffee Shop Script

// Function to handle the "Order Now" button
function orderNow() {
    alert("Thank you for choosing Brew Haven! ☕\nYour order has been placed successfully.");
}

// Example: You can also add extra interactivity later
document.addEventListener("DOMContentLoaded", () => {
    console.log("Coffee Shop Website Loaded ✅");

    // Example: dynamic greeting
    const hours = new Date().getHours();
    let greeting = "Welcome!";
    if (hours < 12) greeting = "Good Morning! 🌞";
    else if (hours < 18) greeting = "Good Afternoon! ☕";
    else greeting = "Good Evening! 🌙";

    console.log(greeting);
});
