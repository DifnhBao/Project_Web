"use client";

import stylesUser from "@/app/styles/AdminPage/ManageUser.module.css";
import styles from "@/app/styles/AdminPage/ManageAdmin.module.css";
import { useModal } from "@/app/context/ModalContext";
import { useAdmins } from "@/hooks/useAdmins";

import { getAdmins } from "@/app/utils/authApi";

export default function ManageAdmin() {
  const { openModal } = useModal();
  const { admins, isLoading, error, updateAdminStatus, deleteAdmin } =
    useAdmins();

  if (isLoading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi tải danh sách admin!</p>;
  if (!admins || admins.length === 0) return null;

  return (
    <div id="admins" className={stylesUser.section}>
      <div>
        <button
          style={{ width: "fit-content" }}
          className={stylesUser.add}
          onClick={() => openModal("add-new-admin")}
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
              <div className={styles.status}>{admin.status}</div>
              <div className={stylesUser.rowOption}>
                {admin.status === "pending" ? (
                  <>
                    <button
                      className={stylesUser.edit}
                      onClick={() => updateAdminStatus(admin.id, "accept")}
                    >
                      Accept
                    </button>
                    <button
                      className={stylesUser.delete}
                      onClick={() => updateAdminStatus(admin.id, "reject")}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <>
                    <button className={stylesUser.edit}>Edit</button>
                    <button
                      className={stylesUser.delete}
                      onClick={() => deleteAdmin(admin.id)}
                    >
                      Delete
                    </button>
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
