"use client";

import stylesUser from "@/app/styles/AdminPage/ManageUser.module.css";
import styles from "@/app/styles/AdminPage/ManageAdmin.module.css";
import { useModal } from "@/app/context/ModalContext";
import { useAdmins } from "@/app/hooks/useAdmins";

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
        <div className={stylesUser.tableHead}>
          <div>ID</div>
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
          <div>Status</div>
          <div>Option</div>
        </div>
        <div className="table_row">
          {admins.map((admin, index) => (
            <div key={admin.id} className={stylesUser.row}>
              <div>{index + 1}</div>
              <div>{admin.username}</div>
              <div>{admin.email}</div>
              <div>{admin.role}</div>
              <div
                className={
                  admin.account_status === "actived"
                    ? `${styles.status} ${styles.active}`
                    : `${styles.status} ${styles.inactive}`
                }
              >
                {admin.account_status}
              </div>
              <div className={stylesUser.rowOption}>
                {admin.account_status === "pending" ? (
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
                    <button
                      className={stylesUser.edit}
                      onClick={() => openModal("change-password")}
                    >
                      Edit
                    </button>
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
