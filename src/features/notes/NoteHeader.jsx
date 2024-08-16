import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectNoteById } from './notesSlice';
import { selectFolderById } from '../folders/foldersSlice';
import { getCSSVariable } from '../../utils/helpers';
import { ArrowIcon, MoreIcon } from '../../icons/icons';
import BreadCrumbs from './BreadCrumbs';
import Button from '../../ui/Button';
import styles from './NoteHeader.module.css';

const NoteHeader = () => {
  const { noteId } = useParams();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const note = useSelector((state) => selectNoteById(state, noteId));
  const folder = useSelector((state) => selectFolderById(state, note.folderId));
  return (
    <div className={styles.noteHeader}>
      <div
        className={styles.folderIndicator}
        style={{ backgroundColor: getCSSVariable(folder?.color || 'grey') }}
      />
      <div className={styles.content}>
        <div className={styles.lineOne}>
          <div className={styles.breadcrumbsContainer}>
            <BreadCrumbs folder={folder} noteTitle={note.title} />
          </div>
          <div className={styles.actions}>
            <Button
              icon={
                <ArrowIcon
                  className={
                    isCollapsed ? styles.expandIcon : styles.collapseIcon
                  }
                />
              }
              type="secondary"
              onClick={() => setIsCollapsed((collapsed) => !collapsed)}
            />
            <Button
              icon={<MoreIcon className={styles.actionsIcon} />}
              type="secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteHeader;