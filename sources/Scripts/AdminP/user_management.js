// ================== USER MANAGE ==================

// Lấy tất cả nút Edit
const editUserBtns = document.querySelectorAll(".user-table .edit-btn");
editUserBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const row = e.target.closest("tr");
        const userName = row.children[1].textContent;
        alert(`Edit user: ${userName}`);
    });
});

// Lấy tất cả nút Delete
const deleteUserBtns = document.querySelectorAll(".user-table .delete-btn");
deleteUserBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const row = e.target.closest("tr");
        const userName = row.children[1].textContent;
        if (confirm(`Bạn có chắc chắn muốn xóa user: ${userName}?`)) {
            row.remove();
        }
    });
});

// Nút Add User
const addUserBtn = document.querySelector(".add-btn");
if (addUserBtn) {
    addUserBtn.addEventListener("click", () => {
        alert("Mở form thêm User mới");
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const statusBadges = document.querySelectorAll(".status");
    statusBadges.forEach(function (badge) {
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

