"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface Admin {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AdminUserContextType {
  admin: Admin | null;
  setAdmin: React.Dispatch<React.SetStateAction<Admin | null>>;
  loading: boolean;
}

const AdminUserContext = createContext<AdminUserContextType | undefined>(
  undefined
);

export const AdminUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/me", {
          credentials: "include", // để gửi cookie (nếu backend dùng cookie-based auth)
        });

        if (res.ok) {
          const data = await res.json();
          setAdmin(data.admin);
        } else {
          setAdmin(null);
        }
      } catch (err) {
        console.error("Lỗi khi kiểm tra admin:", err);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  return (
    <AdminUserContext.Provider value={{ admin, setAdmin, loading }}>
      {children}
    </AdminUserContext.Provider>
  );
};

export const useAdminUser = (): AdminUserContextType => {
  const context = useContext(AdminUserContext);
  if (!context) {
    throw new Error("useAdminUser phải được dùng trong AdminUserProvider");
  }
  return context;
};
