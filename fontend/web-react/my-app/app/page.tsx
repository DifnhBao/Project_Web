"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MusicApp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    // Cho hiệu ứng có thời gian hiển thị nhẹ
    await new Promise((resolve) => setTimeout(resolve, 600));
    router.push("/explore");
  };

  return (
    <div
      style={{
        backgroundImage: 'url("./images/Logo/admin-logo.png")',
        backgroundSize: "cover",
        backgroundColor: "rgba(88, 175, 223, 0.1)",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      {!loading ? (
        <button
          onClick={handleClick}
          style={{
            fontSize: "30px",
            border: "none",
            backgroundColor: "transparent",
            color: "rgb(88 196 220)",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Click me to Listening
        </button>
      ) : (
        <div>
          <p>Đang tải...</p>
        </div>
      )}
    </div>
  );
}
