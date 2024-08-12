import { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import Button from '../ui/Button';
import Header from '../ui/Header';
import Search from '../ui/Search';
import Overlay from '../ui/Overlay';
import { MenuIcon } from '../icons/icons';

import styles from './MainLayout.module.css';
import { Outlet } from 'react-router-dom';

const SM_BREAKPOINT = 768;
const isMobileDevice = () => window.innerWidth < SM_BREAKPOINT;
function MainLayout() {
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
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
