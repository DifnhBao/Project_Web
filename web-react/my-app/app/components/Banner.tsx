"use client";
import React, { useRef } from "react";

function Banner() {
  const bannerRowRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    bannerRowRef.current?.scrollBy({ left: -1500, behavior: "smooth" });
  };

  const scrollRight = () => {
    bannerRowRef.current?.scrollBy({ left: 1500, behavior: "smooth" });
  };

  return (
    <div className="banner-section">
      {/* Banner chính */}
      <div className="banner-container">
        <button className="banner-btn left" onClick={scrollLeft}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <div className="banner-row" ref={bannerRowRef}>
          <div className="banner-item">
            <img
              src="/images/Banner/ngay_moi_nhac_moi.webp"
              alt="Ngày mới nhạc mới"
            />
          </div>
          <div className="banner-item">
            <img
              src="/images/Banner/nhac_chill_trieu_view.webp"
              alt="Nhạc hot TikTok"
            />
          </div>
          <div className="banner-item">
            <img src="/images/Banner/nhac_pop.webp" alt="Nhạc pop" />
          </div>
          <div className="banner-item">
            <img src="/images/Banner/quang_cao.webp" alt="Quảng cáo" />
          </div>
        </div>

        <button className="banner-btn right" onClick={scrollRight}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* Category Section */}
      <div className="category-grid">
        <div className="category-card" style={{ backgroundColor: "#b87933" }}>
          <h3>Indie Việt</h3>
          <img src="/images/Banner/indieViet.png" alt="" />
        </div>

        <div className="category-card" style={{ backgroundColor: "#d94a5b" }}>
          <h3>Yêu</h3>
          <img src="/images/Banner/yeu.png" alt="" />
        </div>

        <div className="category-card" style={{ backgroundColor: "#43b144" }}>
          <h3>Nhạc Dance</h3>
          <img src="/images/Banner/nhacdance.png" alt="" />
        </div>

        <div className="category-card" style={{ backgroundColor: "#692f98" }}>
          <h3>Nhạc Pop</h3>
          <img src="/images/Banner/nhacpop.png" alt="" />
        </div>

        <div className="category-card" style={{ backgroundColor: "#2b7b77" }}>
          <h3>Ngủ Ngon</h3>
          <img src="/images/Banner/ngungon.jpg" alt="" />
        </div>

        <div className="category-card" style={{ backgroundColor: "#e39a78" }}>
          <h3>Chill</h3>
          <img src="/images/Banner/chill.png" alt="" />
        </div>

        <div className="category-card" style={{ backgroundColor: "#3e3e3e" }}>
          <h3>Hip-Hop/R&B</h3>
          <img src="/images/Banner/hip-hop.png" alt="" />
        </div>

        <div className="category-card" style={{ backgroundColor: "#da6c34" }}>
          <h3>Nhạc Trung</h3>
          <img src="/images/Banner/nhacTrung.jpg" alt="" />
        </div>

        <div className="category-card" style={{ backgroundColor: "#345061" }}>
          <h3>Tập Luyện</h3>
          <img src="/images/Banner/tapluyen.png" alt="" />
        </div>

        <div className="category-card" style={{ backgroundColor: "#c38d53" }}>
          <h3>Acoustic Việt</h3>
          <img src="/images/Banner/acousticViet.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
