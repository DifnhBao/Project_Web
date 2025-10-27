"use client";

import styles from "@/app/styles/AdminPage/ManageUser.module.css";
import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function ManageUser() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:5000/api/users/get_all_users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div id="users" className={styles.section}>
      <div>
        <button style={{ width: "fit-content" }} className={styles.add}>
          <i className="fa-solid fa-plus"></i> Add User
        </button>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHead}>
          <div>ID</div>
          <div>Username</div>
          <div>Email</div>
          <div>Role</div>
          <div>Status</div>
          <div>Options</div>
        </div>

        <div className="table_row">
          {users.map((user) => (
            <div key={user.id} className={styles.row}>
              <div>{user.id}</div>
              <div>{user.username}</div>
              <div>{user.email}</div>
              <div>{user.role}</div>
              <div>
                <span className={`${styles.status} ${styles.active}`}>
                  Active
                </span>
              </div>
              <div className={styles.rowOption}>
                <button className={styles.edit}>Edit</button>
                <button className={styles.delete}>Delete</button>
              </div>
            </div>
          ))}

          <div className={styles.row}>
            <div>002</div>
            <div>Huỳnh Đình Thạch</div>
            <div>dinhthach11@gmail.com</div>
            <div>User</div>
            <div>
              <span className={`${styles.status} ${styles.inactive}`}>
                inActive
              </span>
            </div>
            <div className={styles.rowOption}>
              <button className={styles.edit}>Edit</button>
              <button className={styles.delete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
