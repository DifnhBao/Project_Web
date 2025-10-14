// ==========SERVICE MANAGE=========

const editServicesBtns = document.querySelectorAll(".services-table .edit-btn");
editServicesBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const row = e.target.closest("tr");;
        const serviceName = row.children[0].textContent;
        alert(`Edit service: ${serviceName}`);
    });
});
