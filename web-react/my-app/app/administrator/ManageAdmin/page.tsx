import stylesUser from "@/app/styles/AdminPage/ManageUser.module.css";
import styles from "@/app/styles/AdminPage/ManageAdmin.module.css";

export default function ManageAdmin() {
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
          <div className={styles.row}>
            <div>001</div>
            <div>Bao</div>
            <div>dinhbao123@gmail.com</div>
            <div>admin</div>
            <div>
              <button className={stylesUser.edit}>Edit</button>
            </div>
          </div>
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
