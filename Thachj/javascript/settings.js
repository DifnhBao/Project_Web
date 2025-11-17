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
            "Account Settings": "Cài đặt Tài khoản (Account Settings)",
            "Change Username": "Thay đổi Tên người dùng",
            "Enter new name": "Nhập tên mới",
            "Change Email": "Thay đổi Email",
            "Enter new email": "Nhập email mới",
            "Update Password": "Cập nhật Mật khẩu",
            "New password": "Mật khẩu mới",
            "Profile Picture": "Ảnh đại diện",
            "Subscription Plan": "Gói dịch vụ",
            "Update Payment": "Cập nhật thanh toán",
            "Cancel/Change Plan": "Hủy/Thay đổi gói",
            "Playback Settings": "Cài đặt Phát nhạc (Playback Settings)",
            "Streaming Quality": "Chất lượng phát trực tuyến",
            "Autoplay": "Tự động Phát",
            "Gapless Playback": "Phát lại không ngắt quãng",
            "Normalize Volume": "Âm lượng Bình thường hóa",
            "Appearance & Display": "Cài đặt Giao diện & Hiển thị (Appearance & Display)",
            "Theme": "Giao diện",
            "Language": "Ngôn ngữ",
            "Show Lyrics": "Hiển thị Lời bài hát",
            "Lyrics Font Size": "Cỡ chữ Lời bài hát",
            "Privacy Settings": "Cài đặt Riêng tư (Privacy Settings)",
            "Public Activity": "Hoạt động Công khai",
            "Allow others to view my playlists": "Cho phép người khác xem playlist của tôi",
            "Block Users": "Chặn người dùng",
            "Manage List": "Quản lý danh sách",
            "Download Personal Data": "Tải xuống dữ liệu cá nhân",
            "Export Data": "Xuất dữ liệu",
            "Delete Account": "Xóa toàn bộ tài khoản",
            "Notifications": "Thông báo (Notifications)",
            "General Notifications": "Thông báo Chung",
            "New Album": "Album mới",
            "Recommended Playlists": "Danh sách phát được đề xuất mới",
            "Special Offers via Email": "Ưu đãi đặc biệt qua Email"
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




