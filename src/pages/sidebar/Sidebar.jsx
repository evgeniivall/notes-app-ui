import styles from './Sidebar.module.css';
import Button from '../../ui/Button';
import Divider from './Divider';
import UserProfileSection from './UserProfileSection';
import NavMenu from './NavMenu';
import FoldersManagement from '../../features/folders/FoldersManagement';
import { AddNoteIcon } from '../../icons/icons';

function Sidebar({ isOpen }) {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
      <UserProfileSection />
      <Button icon={<AddNoteIcon />} label="Create new note" type="primary" />
      <Divider />
      <NavMenu />
      <Divider />
      <FoldersManagement />
    </div>
  );
}

export default Sidebar;
