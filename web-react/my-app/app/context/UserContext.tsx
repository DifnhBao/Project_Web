"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { fetchCurrentUser } from "../utils/authApi";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Khi load app, tự động kiểm tra đăng nhập
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetchCurrentUser();
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Lỗi khi kiểm tra user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser phải được dùng trong UserProvider");
  }
  return context;
};
