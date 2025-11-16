"use client";
import { useState } from "react";
import styles from "@/app/styles/AdminPage/ManageSong.module.css";
import { useModal } from "@/app/context/ModalContext";

export default function SongManagement() {
  const { openModal } = useModal();

  const [songs, setSongs] = useState([
    {
      id: 1,
      title: "Phép Màu",
      artist: "MAYDAYS",
      genre: "Pop",
      duration: "03:52",
    },
    {
      id: 2,
      title: "Kho Báu",
      artist: "Rhymastic",
      genre: "Rap",
      duration: "04:21",
    },
  ]);

  const openAddModal = () => {
    openModal("song-form", {
      song: null,
      onSave: (newSong: any) => {
        setSongs([...songs, { id: Date.now(), ...newSong }]);
      },
    });
  };

  const openEditModal = (song: any) => {
    openModal("song-form", {
      song,
      onSave: (updatedSong: any) => {
        setSongs(
          songs.map((s) => (s.id === song.id ? { ...song, ...updatedSong } : s))
        );
      },
    });
  };

  const handleDelete = (id: any) => {
    if (!confirm("Bạn có chắc muốn xoá bài hát này?")) return;
    setSongs(songs.filter((s) => s.id !== id));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Song Management</h2>

      <button className={styles.addButton} onClick={openAddModal}>
        + Add New Song
      </button>

      <table className={styles.songTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Genre</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.genre}</td>
              <td>{song.duration}</td>
              <td>
                <button
                  className={styles.editBtn}
                  onClick={() => openEditModal(song)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(song.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
