"use client";
import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import FeaturedPlaylists from "../../components/FeaturedPlaylists";


export default function HomePage() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    function update() {
      const hour = new Date().getHours();
      const text =
        hour >= 5 && hour < 11
          ? "Chào buổi sáng!"
          : hour >= 11 && hour < 14
          ? "Chào buổi trưa!"
          : hour >= 14 && hour < 18
          ? "Chào buổi chiều!"
          : hour >= 18 && hour < 23
          ? "Chào buổi tối!"
          : "Chúc bạn ngủ ngon";
      setGreeting(text);
    }
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <div id="home" className="home-menu">
      <div id="greeting" className="greeting-text">
        {greeting}
      </div>
      <Banner />
      <FeaturedPlaylists />
      <div className="company-info">
        <div className="company-left">
          <img
            src="/images/Logo/nct-footer-logo.png"
            alt="NCT Logo"
            className="company-logo"
          />
          <h3>CÔNG TY CỔ PHẦN N C T</h3>
          <ul>
            <li>
              Thông tin giấy phép MXH số .../GP-BTTTT do Bộ Thông Tin và Truyền
              thông cấp ngày ...
            </li>
            <li>Giấy Chứng nhận Đăng ký Kinh doanh ...</li>
            <li>
              Nhân sự chịu trách nhiệm quản lý nội dung thông tin: Ông Phan Hoài
              Nam
            </li>
            <li>
              Địa chỉ: Tầng 19, Tòa nhà 678, 67 Hoàng Văn Thái, Phường Tân Mỹ,
              TP. Hồ Chí Minh
            </li>
            <li>
              Email: <a>support@nct.vn</a>
            </li>
            <li>
              Số điện thoại: <a>(028) 3868 7979</a>
            </li>
          </ul>
        </div>

        <div className="company-right">
          <img
            src="/images/Logo/t_bo_cong_thuong.png"
            alt="Đã thông báo Bộ Công Thương"
          />
          <img src="/images/Logo/dmca.png" alt="DMCA Protected" />
        </div>
      </div>
      <div className="company-bottom">
        <a>Chính Sách Bảo Mật</a> • <a>Chính Sách SHTT</a> •{" "}
        <a>Thỏa Thuận Sử Dụng</a>
        <p>© NCT Corp. All rights reserved</p>
      </div>
    </div>
  );
}
