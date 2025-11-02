"use client";

import stylesUser from "@/app/styles/AdminPage/ManageUser.module.css";
import styles from "@/app/styles/AdminPage/ManageAdmin.module.css";
import { useEffect, useState } from "react";
import { refreshTokenByAdmin, getAdmins } from "@/app/utils/authApi";

interface Admin {
  id: number;
  username: string;
  email: string;
  role: string;
  status: string;
}

export default function ManageAdmin() {
  const [admins, setAdmins] = useState<Admin[]>([]);

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

  return (
    <div id="admins" className={stylesUser.section}>
      <div>
        <button style={{ width: "fit-content" }} className={stylesUser.add}>
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
                <button className={stylesUser.edit}>
                  {admin.status === "pending" ? "Accept" : "Edit"}
                </button>
                <button className={stylesUser.delete}>
                  {admin.status === "pending" ? "Reject" : "Delete"}
                </button>
              </div>
            </div>
          ))}

          <div className={styles.row}>
            <div>002</div>
            <div>Thach</div>
            <div>dinhthach11@gmail.com</div>
            <div>admin</div>
            <div>
              <button className={stylesUser.edit}>Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
