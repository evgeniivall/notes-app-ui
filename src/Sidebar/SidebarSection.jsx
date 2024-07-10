import styles from "./SidebarSection.module.css";

function SidebarSection({ sectionName, button, children }) {
  return (
    <div className={styles.sidebarSection}>
      {sectionName && (
        <header className="bold">
          <span>{sectionName}</span>
          {button}
        </header>
      )}
      {children}
    </div>
  );
}

export default SidebarSection;
