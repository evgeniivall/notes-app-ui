import { useState } from "react";
import Button from "./ui/Button";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./App.module.css";
import { MenuIcon } from "./icons/icons";
import Header from "./ui/Header";
import Search from "./ui/Search";
import Overlay from "./ui/Overlay";

const isMobileDevice = () => window.innerWidth <= 768;

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(() =>
    isMobileDevice() ? false : true
  );
  const toggleSidebar = () => setSidebarIsOpen((isOpen) => !isOpen);

  return (
    <div className={styles.container}>
      <Sidebar isOpen={sidebarIsOpen} />
      <div
        className={`${styles.mainContent} ${
          sidebarIsOpen ? styles.mainContentWithSidebar : ""
        }`}
      >
        {sidebarIsOpen && isMobileDevice() && (
          <Overlay onClick={toggleSidebar} />
        )}
        <Header>
          <Button icon={<MenuIcon />} onClick={toggleSidebar} />
          <Search />
        </Header>
      </div>
    </div>
  );
}

export default App;
