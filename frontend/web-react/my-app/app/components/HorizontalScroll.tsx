"use client";
import React, { useRef } from "react";

interface HorizontalScrollProps {
  children: React.ReactNode;
  scrollAmount?: number;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  scrollAmount = 1000,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div
      className="horizontal-scroll-container"
      style={{ position: "relative" }}
    >
      <button className="banner-btn left" onClick={scrollLeft}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      {/* Nội dung cuộn ngang */}
      <div
        ref={scrollRef}
        className="scroll-content"
        style={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: "1rem",
        }}
      >
        {children}
      </div>
      <button className="banner-btn right" onClick={scrollRight}>
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default HorizontalScroll;
