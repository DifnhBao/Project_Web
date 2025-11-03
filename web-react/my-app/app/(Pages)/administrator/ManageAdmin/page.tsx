"use client";

import stylesUser from "@/app/styles/AdminPage/ManageUser.module.css";
import styles from "@/app/styles/AdminPage/ManageAdmin.module.css";
import { useEffect, useState } from "react";
import { getAdmins, AcceptOrReject } from "@/app/utils/authApi";
import { useModal } from "@/app/context/ModalContext";

interface Admin {
  id: number;
  username: string;
  email: string;
  role: string;
  status: string;
}

export default function ManageAdmin() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    const fetchAdmins = async () => {
      // Gọi API cần xác thực
      const res = await getAdmins();
      if (!res.ok) {
        throw new Error("Không thể tải danh sách admin");
      }

      const data = await res.json();
      setAdmins(data.reverse());
    };
    fetchAdmins();
  }, []);

  const handleAcceptOrReject = async (id: number, status: string) => {
    const res = await AcceptOrReject(id, status);
    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      //Gọi lại API để cập nhật danh sách
      const updated = await getAdmins();
      const adminsData = await updated.json();
      setAdmins(adminsData.reverse());
    } else {
      alert(data.message || "Lỗi khi cập nhật trạng thái");
    }
  };

  if (admins.length === 0) return null;

  return (
    <div id="admins" className={stylesUser.section}>
      <div>
        <button
          style={{ width: "fit-content" }}
          className={stylesUser.add}
          onClick={() => {
            openModal("add-new-admin");
          }}
        >
          <i className="fa-solid fa-plus"></i> Add Admin
        </button>
      </div>

      <div className={stylesUser.table}>
        <div className={styles.tableHead}>
          <div>ID</div>
          <div>Name</div>
          <div>Email</div>
          <div>Status</div>
          <div>Option</div>
        </div>
        <div className="table_row">
          {admins.map((admin) => (
            <div key={admin.id} className={styles.row}>
              <div>{admin.id}</div>
              <div>{admin.username}</div>
              <div>{admin.email}</div>
              <div className={`${styles.status} ${styles.active}`}>
                {admin.status}
              </div>
              <div className={stylesUser.rowOption}>
                {admin.status === "pending" ? (
                  <>
                    <button
                      className={stylesUser.edit}
                      onClick={() => handleAcceptOrReject(admin.id, "accept")}
                    >
                      Accept
                    </button>
                    <button
                      className={stylesUser.delete}
                      onClick={() => handleAcceptOrReject(admin.id, "reject")}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <>
                    <button className={stylesUser.edit}>Edit</button>
                    <button className={stylesUser.delete}>Delete</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
