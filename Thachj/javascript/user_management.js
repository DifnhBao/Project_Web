document.addEventListener("DOMContentLoaded", function () {
    const statusBadges = document.querySelectorAll(".status");
    statusBadges.forEach(function (badge) {

        badge.style.cursor = "pointer";

        badge.addEventListener("click", function () {
            if (badge.classList.contains("active")) {
                badge.classList.remove("active");
                badge.classList.add("inactive");
                badge.textContent = "Inactive";
            } else if (badge.classList.contains("inactive")) {
                badge.classList.remove("inactive");
                badge.classList.add("active");
                badge.textContent = "Active";
            }
        });
    });
});
