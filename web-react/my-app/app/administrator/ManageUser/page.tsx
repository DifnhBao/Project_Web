import styles from "@/app/styles/AdminPage/ManageUser.module.css";

export default function ManageUser() {
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
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
          <div>Status</div>
          <div>Options</div>
        </div>

        <div className="table_row">
          <div className={styles.row}>
            <div>001</div>
            <div>Lê Đình Bảo</div>
            <div>dinhbaor123@gmail.com</div>
            <div>User</div>
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
