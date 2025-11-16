"use client";
import { useState, useEffect } from "react";
import styles from "@/app/styles/AdminPage/ManageSong.module.css";
import { useModal } from "@/app/context/ModalContext";

export default function SongFormModal({
  song,
  onSave,
}: {
  song: any;
  onSave: any;
}) {
  const { closeModal } = useModal();

  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    duration: "",
  });

  // Nếu edit → nạp dữ liệu
  useEffect(() => {
    if (song) setFormData(song);
  }, [song]);

  const handleSubmit = () => {
    onSave(formData);
    closeModal();
  };

  return (
    <div className={styles.modal}>
      <h3>{song ? "Edit Song" : "Add New Song"}</h3>

      <input
        type="text"
        placeholder="Song Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <input
        type="text"
        placeholder="Artist"
        value={formData.artist}
        onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
      />

      <input
        type="text"
        placeholder="Genre"
        value={formData.genre}
        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
      />

      <input
        type="text"
        placeholder="Duration (e.g. 03:52)"
        value={formData.duration}
        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
      />

      <div className={styles.modalActions}>
        <button className={styles.saveBtn} onClick={handleSubmit}>
          Save
        </button>
        <button className={styles.cancelBtn} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}
