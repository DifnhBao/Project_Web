"use client";
import { useState, useEffect } from "react";
import {
  addNewProfile,
  updateProfile,
  adminUpdateUserProfile,
} from "../utils/accountApi";
import { fetchCurrentUser } from "../utils/authApi";
import { UserProfileData } from "../types/music";

export function useProfileForm(
  initialData: UserProfileData,
  mode: "user" | "admin" = "user",
  userId?: number
) {
  const [formData, setFormData] = useState(
    initialData || {
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      phone: "",
      address: "",
    }
  );

  const [note, setNote] = useState("*Vui lòng nhập đầy đủ thông tin");
  const [existingProfile, setExistingProfile] = useState(false);

  useEffect(() => {
    // nếu có dữ liệu ban đầu, không cần fetch
    if (initialData) {
      setFormData(initialData);
      setExistingProfile(true);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetchCurrentUser();
        const result = await res.json();

        if (!res.ok || !result?.data) {
          setExistingProfile(false);
          return;
        }

        const u = result.data;

        setFormData({
          firstName: u.first_name || "",
          lastName: u.last_name || "",
          gender: u.gender || "",
          dateOfBirth: u.birthday || "",
          phone: u.phone_number || "",
          address: u.address || "",
        });

        setExistingProfile(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      phone: "",
      address: "",
    });
    setNote("*Vui lòng nhập đầy đủ thông tin");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SUBMIT RUN");
    setNote("");

    // Validate
    // const phonePattern = /^(0|\+84)(\d{9,10})$/;
    // if (!phonePattern.test(formData.phone.trim())) {
    //   setNote("Số điện thoại không hợp lệ (bắt đầu bằng 0 hoặc +84).");
    //   return;
    // }

    // Gọi API
    const res = await updateProfile(formData);

    // if (mode === "admin" && userId) {
    //   // gọi API riêng cho admin update user
    //   res = await adminUpdateUserProfile(userId, formData);
    // } else {
    //   // user tự cập nhật
    //   res = existingProfile
    //     ? await updateProfile(formData)
    //     : await addNewProfile(formData);
    // }
    const data = await res.json();

    if (!res.ok) {
      setNote(data.message || "Có lỗi xảy ra khi gửi thông tin.");
      return;
    }

    setNote(data.message || "Đã gửi thông tin thành công!");
  };

  return {
    formData,
    note,
    existingProfile,
    handleChange,
    handleReset,
    handleSubmit,
  };
}
