import styles from "./NavItem.module.css";

function NavItem({ icon, label }) {
  return (
    <div className={styles.navItem}>
      <div className={styles.icon}>{icon}</div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default NavItem;
