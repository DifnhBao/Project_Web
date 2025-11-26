"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "./styles/globals.css";

export default function MusicApp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    // Cho hiệu ứng có thời gian hiển thị nhẹ
    await new Promise((resolve) => setTimeout(resolve, 600));
    router.push("/explore");
  };

  const items = [
    {
      img: "/images/Members/LeDinhBao.jpg",
      bg: "#8bd6c2",
      name: "Lê Đình Bảo",
      msv: "N23DCCN141",
      role: "Frontend",
      offset: 0,
    },
    {
      img: "/images/Members/HuynhDinhThach.jpg",
      bg: "#ff6a5b",
      name: "Huỳnh Đình Thạch",
      msv: "N23DCCN141",
      role: "Backend",
      offset: 40,
    },
    {
      img: "/images/Members/ChatGPT.webp",
      bg: "#6dd19c",
      name: "Chat GPT",
      msv: "N23DCCN141",
      role: "All role",
      offset: 20,
    },
    {
      img: "/images/Members/Youtube.jpg",
      bg: "#ff6f5f",
      name: "Youtube",
      msv: "N23DCCN141",
      role: "Advisor",
      offset: 20,
    },
    {
      img: "/img5.jpg",
      bg: "#79cfb0",
      name: "Jillian Mapes",
      role: "Senior Editor, Pitchfork",
      offset: 10,
    },
    {
      img: "/img6.jpg",
      bg: "#ff6f5f",
      name: "Kristin Kontrol",
      role: "Musician",
      offset: 30,
    },
  ];

  return (
    <div className="discovery-container">
      {!loading ? (
        <>
          <img src="./images/Logo/admin-logo.png" alt="welcome-logo" />
          <h1 onClick={handleClick}>Inside Discovery</h1>
          <p className="desc">
            A look into fresh Discover Weekly playlists from our editors and
            favorite artists.
          </p>

          <div className="cards-row">
            {items.map((item, index) => (
              <div
                className="card"
                style={{ marginTop: item.offset }}
                key={index}
              >
                <div className="img-box" style={{ background: item.bg }}>
                  <img src={item.img} alt="" />
                </div>
                <h3 className="name">{item.name}</h3>
                <p className="msv">{item.msv}</p>
                <p className="role">{item.role}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <p>Đang tải...</p>
        </div>
      )}
    </div>
  );
}
