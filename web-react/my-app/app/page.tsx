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
    <div>
      {!loading ? (
        <button onClick={handleClick}>Click me to Listening</button>
      ) : (
        <div>
          <p>Đang tải...</p>
        </div>
      )}
    </div>
  );
}
