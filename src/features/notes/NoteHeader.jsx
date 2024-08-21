import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateNote, updateNoteFolder } from './notesSlice';
import { selectFolderById } from '../folders/foldersSlice';
import { getCSSVariable } from '../../utils/helpers';
import { ArrowIcon, MoreIcon } from '../../icons/icons';
import BreadCrumbs from './BreadCrumbs';
import Button from '../../ui/Button';
import styles from './NoteHeader.module.css';
import FolderDropdown from '../folders/FolderDropdown';
import TagsSelect from '../tags/TagsSelect';
import { selectTagsByNames } from '../tags/tagsSlice';

const NoteHeader = ({ note }) => {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const folder = useSelector((state) => selectFolderById(state, note.folderId));
  const userTags = useSelector((state) => selectTagsByNames(state, note.tags));

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
              size="medium"
              onClick={() => setIsCollapsed((collapsed) => !collapsed)}
            />
            <Button
              icon={<MoreIcon className={styles.actionsIcon} />}
              type="secondary"
              size="medium"
            />
          </div>
        </div>
        <div
          className={`${styles.lineTwo} ${!isCollapsed ? styles.expanded : ''}`}
        >
          <FolderDropdown
            selectedFolder={folder}
            onChange={(value) => {
              dispatch(
                updateNoteFolder({
                  id: note.id,
                  folderId: value ? value.value : '0',
                }),
              );
            }}
          />
          <TagsSelect
            selectedTags={userTags}
            onChange={(tags) => {
              dispatch(
                updateNote({
                  id: note.id,
                  updates: {
                    tags,
                  },
                }),
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteHeader;
