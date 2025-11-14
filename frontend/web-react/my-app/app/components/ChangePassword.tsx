import { useState } from "react";
import { useModal } from "@/app/context/ModalContext";
import { changePassword } from "../utils/accountApi";
import "@/app/styles/AdminPage/addAdmin.css";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const { openModal } = useModal();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await changePassword(oldPassword, confirmPW);
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error("Lỗi khi gọi api changPassword.");
    }
  };

  return (
    <div className="auth-container register-page">
      <h1>Change your password</h1>
      <form onSubmit={handleChangePassword}>
        <label htmlFor="password" className="form_label">
          Old Password
        </label>
        <input
          id="old-password"
          type="password"
          placeholder="At least 8 characters, letters & numbers"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />

        <label htmlFor="password" className="form_label">
          New Password
        </label>
        <input
          id="new-password"
          type="password"
          placeholder="At least 8 characters, letters & numbers"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <label htmlFor="confirm_password" className="form_label">
          Password Confirmation
        </label>
        <input
          id="confirm_password"
          type="password"
          placeholder="Password Confirmation"
          value={confirmPW}
          onChange={(e) => setConfirmPW(e.target.value)}
          required
        />
        <button type="submit">Change</button>
      </form>
    </div>
  );
}
