import UserProfileSection from "./UserProfileSection";
import styles from "./Sidebar.module.css";
import Button from "../ui/Button";
import Divider from "./Divider";
import SidebarSection from "./SidebarSection";
import NavMenu from "./NavMenu";
import NavItem from "./NavItem";
import {
  AddNoteIcon,
  NotesIcon,
  StarFullIcon,
  TrashIcon,
} from "../icons/icons";

function Sidebar({ isOpen }) {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
      <UserProfileSection />
      <Button icon={<AddNoteIcon />} label="Create new note" type="primary" />
      <Divider />
      <SidebarSection>
        <NavMenu>
          <NavItem icon={<NotesIcon />} label="All notes" />
          <NavItem icon={<StarFullIcon />} label="Starred" />
          <NavItem icon={<TrashIcon />} label="Trash" />
        </NavMenu>
      </SidebarSection>
      <Divider />
      <SidebarSection sectionName="Folders"></SidebarSection>
    </div>
  );
}

export default Sidebar;
