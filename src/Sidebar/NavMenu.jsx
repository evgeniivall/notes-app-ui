import styles from "./NavMenu.module.css";

function NavMenu({ children }) {
  return <div className={styles.navMenu}>{children}</div>;
}

export default NavMenu;
