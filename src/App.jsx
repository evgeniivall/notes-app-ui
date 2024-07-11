import { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import Button from './ui/Button';
import Header from './ui/Header';
import Search from './ui/Search';
import Overlay from './ui/Overlay';
import styles from './App.module.css';
import { MenuIcon } from './icons/icons';

const SM_BREAKPOINT = 768;
const isMobileDevice = () => window.innerWidth <= SM_BREAKPOINT;

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(() =>
    isMobileDevice() ? false : true,
  );
  const toggleSidebar = () => setSidebarIsOpen((isOpen) => !isOpen);

  return (
    <div className={styles.container}>
      <Sidebar isOpen={sidebarIsOpen} />
      <div
        className={`${styles.mainContent} ${
          sidebarIsOpen ? styles.mainContentWithSidebar : ''
        }`}
      >
        {sidebarIsOpen && isMobileDevice() && (
          <Overlay onClick={toggleSidebar} />
        )}
        <Header>
          <Button
            type="secondary"
            icon={<MenuIcon />}
            onClick={toggleSidebar}
          />
          <Search />
        </Header>
      </div>
    </div>
  );
}

export default App;
