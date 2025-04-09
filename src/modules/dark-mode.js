if (localStorage.getItem("dark-mode") === "enabled") {
    document.documentElement.classList.add("dark");
    document.getElementById("moon-icon").style.display = "none";
    document.getElementById("sun-icon").style.display = "block";
}

const toggleButton = document.getElementById("dark-mode-toggle");
toggleButton.addEventListener("click", () => {
    const isDarkMode = document.documentElement.classList.contains("dark");

    if (isDarkMode) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("dark-mode", "disabled");
        document.getElementById("moon-icon").style.display = "block";
        document.getElementById("sun-icon").style.display = "none";
        document.getElementById("mode-text").textContent = "Light Mode";
    } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("dark-mode", "enabled");
        document.getElementById("moon-icon").style.display = "none";
        document.getElementById("sun-icon").style.display = "block";
        document.getElementById("mode-text").textContent = "Dark Mode";
    }
});
