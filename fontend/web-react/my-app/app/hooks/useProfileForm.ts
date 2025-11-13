"use client";
import { useState, useEffect } from "react";
import { addNewProfile, updateProfile } from "../utils/accountApi";
import { fetchCurrentUser } from "../utils/authApi";

export function useProfileForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    address: "",
  });

  const [note, setNote] = useState("*Vui lòng nhập đầy đủ thông tin");

  const [existingProfile, setExistingProfile] = useState(false); // Xác định đang update hay thêm mới

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetchCurrentUser();
      const data = await res.json();

      if (res.ok) {
        if (data.profile) {
          //  Đã có profile → cập nhật formData
          setFormData({
            firstName: data.profile.first_name || "",
            lastName: data.profile.last_name || "",
            gender: data.profile.gender || "",
            dateOfBirth: data.profile.date_of_birth || "",
            phone: data.profile.phone || "",
            address: data.profile.address || "",
          });
          setExistingProfile(true);
        } else {
          // Chưa có profile
          setExistingProfile(false);
        }
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
    setNote("");

    // Validate
    // if (
    //   !formData.firstName ||
    //   !formData.lastName ||
    //   !formData.gender ||
    //   !formData.dateOfBirth ||
    //   !formData.phone ||
    //   !formData.address
    // ) {
    //   setNote("Vui lòng nhập đầy đủ các trường.");
    //   return;
    // }

    const phonePattern = /^(0|\+84)(\d{9,10})$/;
    if (!phonePattern.test(formData.phone.trim())) {
      setNote("Số điện thoại không hợp lệ (bắt đầu bằng 0 hoặc +84).");
      return;
    }

    // Gọi API
    const res = existingProfile
      ? await updateProfile(formData)
      : await addNewProfile(formData);
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
