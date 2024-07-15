import { NotesIcon, StarFilledIcon, TrashIcon } from '../icons/icons';
import NavItem from './NavItem';
import styles from './NavMenu.module.css';

function NavMenu() {
  return (
    <div className={styles.navMenu}>
      <NavItem icon={<NotesIcon />} label="All notes" to="/notes" />
      <NavItem
        icon={<StarFilledIcon />}
        label="Starred"
        to="/notes"
        query={{ key: 'filter', value: 'starred' }}
      />
      <NavItem
        icon={<TrashIcon />}
        label="Trash"
        to="/notes"
        query={{ key: 'filter', value: 'deleted' }}
      />
    </div>
  );
}

export default NavMenu;
