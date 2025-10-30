"use client";

import stylesUser from "@/app/styles/AdminPage/ManageUser.module.css";
import styles from "@/app/styles/AdminPage/ManageAdmin.module.css";
import { useEffect, useState } from "react";

interface Admin {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function ManageAdmin() {
  const [admins, setAdmins] = useState<Admin[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const tokenRes = await fetch("http://localhost:5000/auth/refresh", {
        method: "GET",
        credentials: "include",
      });

      if (!tokenRes.ok) throw new Error("Không thể refresh token");

      const { accessToken } = await tokenRes.json();

      const res = await fetch("http://localhost:5000/users/allAdmins", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      setAdmins(data);
    };
    fetchUsers();
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
          <div>Role</div>
          <div>Option</div>
        </div>
        <div className="table_row">
          {admins.map((admin) => (
            <div key={admin.id} className={styles.row}>
              <div>{admin.id}</div>
              <div>{admin.username}</div>
              <div>{admin.email}</div>
              <div>{admin.role}</div>
              <div>
                <button className={stylesUser.edit}>Edit</button>
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
