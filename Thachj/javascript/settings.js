// Hiệu ứng click nhẹ cho button
document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("mousedown", () => {
        btn.style.transform = "scale(0.95)";
    });
    btn.addEventListener("mouseup", () => {
        btn.style.transform = "scale(1.05)";
        setTimeout(() => (btn.style.transform = "scale(1)"), 150);
    });
});

// Hiệu ứng fade-in cho các khối setting khi load trang
window.addEventListener("load", () => {
    const sections = document.querySelectorAll(".setting-section");
    sections.forEach((sec, i) => {
        sec.style.opacity = "0";
        sec.style.transform = "translateY(20px)";
        setTimeout(() => {
            sec.style.transition = "all 0.6s ease";
            sec.style.opacity = "1";
            sec.style.transform = "translateY(0)";
        }, i * 100);
    });
});

// Hiệu ứng hover động cho setting-section (ánh sáng chạy qua)
document.querySelectorAll(".setting-section").forEach(sec => {
    sec.addEventListener("mousemove", e => {
        const rect = sec.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        sec.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(77,184,255,0.15), rgba(255,255,255,0.03) 80%)`;
    });
    sec.addEventListener("mouseleave", () => {
        sec.style.background = "rgba(255, 255, 255, 0.05)";
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const languageSelect = document.getElementById("languageSelect");

    const translations = {
        vi: {
            "Cài đặt Tài khoản (Account Settings)": "Cài đặt Tài khoản (Account Settings)",
            "Thay đổi Tên người dùng": "Thay đổi Tên người dùng",
            "Nhập tên mới": "Nhập tên mới",
            "Thay đổi Email": "Thay đổi Email",
            "Nhập email mới": "Nhập email mới",
            "Cập nhật Mật khẩu": "Cập nhật Mật khẩu",
            "Mật khẩu mới": "Mật khẩu mới",
            "Ảnh đại diện": "Ảnh đại diện",
            "Gói dịch vụ": "Gói dịch vụ",
            "Cập nhật thanh toán": "Cập nhật thanh toán",
            "Hủy/Thay đổi gói": "Hủy/Thay đổi gói",
            "Cài đặt Phát nhạc (Playback Settings)": "Cài đặt Phát nhạc (Playback Settings)",
            "Chất lượng phát trực tuyến": "Chất lượng phát trực tuyến",
            "Tự động Phát": "Tự động Phát",
            "Phát lại không ngắt quãng": "Phát lại không ngắt quãng",
            "Âm lượng Bình thường hóa": "Âm lượng Bình thường hóa",
            "Cài đặt Giao diện & Hiển thị (Appearance & Display)": "Cài đặt Giao diện & Hiển thị (Appearance & Display)",
            "Giao diện": "Giao diện",
            "Ngôn ngữ": "Ngôn ngữ",
            "Hiển thị Lời bài hát": "Hiển thị Lời bài hát",
            "Cỡ chữ Lời bài hát": "Cỡ chữ Lời bài hát",
            "Cài đặt Riêng tư (Privacy Settings)": "Cài đặt Riêng tư (Privacy Settings)",
            "Hoạt động Công khai": "Hoạt động Công khai",
            "Cho phép người khác xem playlist của tôi": "Cho phép người khác xem playlist của tôi",
            "Chặn người dùng": "Chặn người dùng",
            "Quản lý danh sách": "Quản lý danh sách",
            "Tải xuống dữ liệu cá nhân": "Tải xuống dữ liệu cá nhân",
            "Xuất dữ liệu": "Xuất dữ liệu",
            "Xóa toàn bộ tài khoản": "Xóa toàn bộ tài khoản",
            "Thông báo (Notifications)": "Thông báo (Notifications)",
            "Thông báo Chung": "Thông báo Chung",
            "Album mới": "Album mới",
            "Danh sách phát được đề xuất mới": "Danh sách phát được đề xuất mới",
            "Ưu đãi đặc biệt qua Email": "Ưu đãi đặc biệt qua Email"
        },
        en: {
            "Cài đặt Tài khoản (Account Settings)": "Account Settings",
            "Thay đổi Tên người dùng": "Change Username",
            "Nhập tên mới": "Enter new name",
            "Thay đổi Email": "Change Email",
            "Nhập email mới": "Enter new email",
            "Cập nhật Mật khẩu": "Update Password",
            "Mật khẩu mới": "New password",
            "Ảnh đại diện": "Profile Picture",
            "Gói dịch vụ": "Subscription Plan",
            "Cập nhật thanh toán": "Update Payment",
            "Hủy/Thay đổi gói": "Cancel/Change Plan",
            "Cài đặt Phát nhạc (Playback Settings)": "Playback Settings",
            "Chất lượng phát trực tuyến": "Streaming Quality",
            "Tự động Phát": "Autoplay",
            "Phát lại không ngắt quãng": "Gapless Playback",
            "Âm lượng Bình thường hóa": "Normalize Volume",
            "Cài đặt Giao diện & Hiển thị (Appearance & Display)": "Appearance & Display",
            "Giao diện": "Theme",
            "Ngôn ngữ": "Language",
            "Hiển thị Lời bài hát": "Show Lyrics",
            "Cỡ chữ Lời bài hát": "Lyrics Font Size",
            "Cài đặt Riêng tư (Privacy Settings)": "Privacy Settings",
            "Hoạt động Công khai": "Public Activity",
            "Cho phép người khác xem playlist của tôi": "Allow others to view my playlists",
            "Chặn người dùng": "Block Users",
            "Quản lý danh sách": "Manage List",
            "Tải xuống dữ liệu cá nhân": "Download Personal Data",
            "Xuất dữ liệu": "Export Data",
            "Xóa toàn bộ tài khoản": "Delete Account",
            "Thông báo (Notifications)": "Notifications",
            "Thông báo Chung": "General Notifications",
            "Album mới": "New Album",
            "Danh sách phát được đề xuất mới": "Recommended Playlists",
            "Ưu đãi đặc biệt qua Email": "Special Offers via Email"
        }
    };

    function translatePage(lang) {
        const texts = document.querySelectorAll("h3, label, button, option, span, p");
        texts.forEach(el => {
            const originalText = el.textContent.trim();
            if (translations[lang][originalText]) {
                el.textContent = translations[lang][originalText];
            }
        });
        const placeholders = document.querySelectorAll("input[placeholder]");
        placeholders.forEach(input => {
            const ph = input.getAttribute("placeholder");
            if (translations[lang][ph]) {
                input.setAttribute("placeholder", translations[lang][ph]);
            }
        });
    }

    languageSelect.addEventListener("change", function () {
        const lang = this.value;
        translatePage(lang);
    });
});


