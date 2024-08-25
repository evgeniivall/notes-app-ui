import { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import Overlay from '../ui/Overlay';
import { Outlet } from 'react-router-dom';
import { isMobileDevice } from '../utils/helpers';
import styles from './MainLayout.module.css';
import Header from '../ui/Header';
import Button from '../ui/Button';
import Search from '../ui/Search';
import { MenuIcon } from '../icons/icons';

function MainLayout() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(() =>
    isMobileDevice() ? false : true,
  );
  const toggleSidebar = () => setSidebarIsOpen((isOpen) => !isOpen);

  return (
    <div className={styles.container}>
      <Sidebar isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
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
        <Outlet setSidebarIsOpen={setSidebarIsOpen} />
      </div>
    </div>
  );
}

export default MainLayout;
