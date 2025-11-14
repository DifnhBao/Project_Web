"use client";

import { useState, useEffect } from "react";
import { User, UserProfileData } from "../types/music";
import { getUserProfile } from "../utils/accountApi";
import Profile from "./Profile";

export default function EditUserProfile({ userData }: { userData: User }) {
  const [formData, setFormData] = useState<UserProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userData?.id) return;
      const res = await getUserProfile(userData.id);
      if (!res.ok) return;
      const data = await res.json();

      console.log("Ngày sinh từ server:", data[0]?.date_of_birth);

      setFormData({
        firstName: data[0]?.first_name || "",
        lastName: data[0]?.last_name || "",
        gender: data[0]?.gender || "",
        dateOfBirth: data[0]?.date_of_birth || "",
        phone: data[0]?.phone || "",
        address: data[0]?.address || "",
      });
    };
    fetchProfile();
  }, [userData]);

  if (!formData) return <p>Người dùng chưa cập nhật thông tin cá nhân.</p>;

  return <Profile initialData={formData} mode="admin" userId={userData.id} />;
}
