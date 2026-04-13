import styles from './Sidebar.module.css';
import Button from '../../ui/Button';
import Divider from './Divider';
import UserProfileSection from './UserProfileSection';
import NavMenu from './NavMenu';
import FoldersManagement from '../../features/folders/FoldersManagement';
import { AddNoteIcon } from '../../icons/icons';
import TagsFilter from '../../features/tags/TagsFilter';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { createNote } from '../../features/notes/notesSlice';
import { isMobileDevice } from '../../utils/helpers';
import { Note } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreateNote = () => {
    const action = dispatch(createNote({ folderId: '0', tags: [], isStarred: false })) as {
      payload: Note;
    };

    const newNoteId = action.payload.id;
    if (isMobileDevice()) setIsOpen(false);
    navigate(`/notes/${newNoteId}`);
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
      <UserProfileSection />
      <Button
        icon={<AddNoteIcon />}
        label="Create new note"
        type="primary"
        onClick={handleCreateNote}
      />
      <Divider />
      <NavMenu />
      <Divider />
      <FoldersManagement />
      <Divider />
      <TagsFilter />
    </div>
  );
}

export default Sidebar;
