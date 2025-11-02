"use client";
import { useState } from "react";
import "@/app/styles/Profile.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    fullName: "",
    gender: "",
    birthYear: "",
    phone: "",
    address: "",
  });

  const [note, setNote] = useState("*Vui lòng nhập đầy đủ thông tin");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Khi submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNote("");

    // Kiểm tra dữ liệu bắt buộc
    if (
      !formData.displayName ||
      !formData.fullName ||
      !formData.gender ||
      !formData.birthYear ||
      !formData.phone
    ) {
      setNote("Vui lòng nhập đầy đủ các trường bắt buộc.");
      return;
    }

    // Kiểm tra định dạng SĐT
    const phonePattern = /^(0|\+84)(\d{9,10})$/;
    if (!phonePattern.test(formData.phone.trim())) {
      setNote("Số điện thoại không hợp lệ (bắt đầu bằng 0 hoặc +84).");
      return;
    }

    // Nếu hợp lệ → xử lý dữ liệu
    console.log("Dữ liệu gửi:", formData);

    // Sau này gửi lên SQL qua API

    setNote("Đã gửi thông tin (demo). Kiểm tra console để xem dữ liệu.");
  };

  const handleReset = () => {
    setFormData({
      displayName: "",
      fullName: "",
      gender: "",
      birthYear: "",
      phone: "",
      address: "",
    });
    setNote("*Vui lòng nhập đầy đủ thông tin");
  };

  return (
    <div className="profile_card" role="region" aria-labelledby="form-title">
      <h1 id="form-title">Nhập thông tin cá nhân</h1>
      <p className="lead">
        Vui lòng điền đầy đủ thông tin. Các trường có dấu * là bắt buộc.
      </p>

      <form id="personalForm" noValidate onSubmit={handleSubmit}>
        {/* Họ và tên */}
        <div className="field">
          <label htmlFor="fullName">
            Họ và tên <span aria-hidden="true">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Nguyễn Văn A"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Giới tính */}
        <div className="field">
          <label>
            Giới tính <span aria-hidden="true">*</span>
          </label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                required
              />{" "}
              Nam
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />{" "}
              Nữ
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === "other"}
                onChange={handleChange}
              />{" "}
              Khác
            </label>
          </div>
        </div>

        {/* Năm sinh */}
        <div className="field">
          <label htmlFor="birthYear">
            Năm sinh <span aria-hidden="true">*</span>
          </label>
          <input
            id="birthYear"
            name="birthYear"
            type="number"
            placeholder="1988"
            min="1900"
            max="2025"
            value={formData.birthYear}
            onChange={handleChange}
            required
          />
        </div>

        {/* Số điện thoại */}
        <div className="field">
          <label htmlFor="phone">
            Số điện thoại <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="0912xxxxxx"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Địa chỉ */}
        <div className="field">
          <label htmlFor="address">Địa chỉ</label>
          <textarea
            id="address"
            name="address"
            placeholder="Ví dụ: 123 Đường ABC, Quận X, TP"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Nút hành động */}
        <div className="actions">
          <button type="button" className="btn-secondary" onClick={handleReset}>
            Xóa
          </button>
          <button type="submit" className="btn-primary">
            Gửi thông tin
          </button>
        </div>

        <p className="note" id="formNote" aria-live="polite">
          {note}
        </p>
      </form>
    </div>
  );
};

export default Profile;
