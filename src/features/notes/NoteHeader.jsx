import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteNote, updateNote, updateNoteFolder } from './notesSlice';
import { selectFolderById } from '../folders/foldersSlice';
import { getCSSVariable } from '../../utils/helpers';
import { ArrowIcon, TrashWiredIcon } from '../../icons/icons';
import BreadCrumbs from './BreadCrumbs';
import Button from '../../ui/Button';
import styles from './NoteHeader.module.css';
import FolderDropdown from '../folders/FolderDropdown';
import TagsSelect from '../tags/TagsSelect';
import StarToggle from '../../ui/StarToggle';
import { selectTagsByNames } from '../tags/tagsSlice';
import { useNavigate } from 'react-router-dom';

const NoteHeader = ({ note }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
              icon={<TrashWiredIcon className={styles.deleteIcon} />}
              type="secondary"
              size="medium"
              onClick={() => {
                dispatch(deleteNote({ id: note.id, type: 'soft' }));
                /* TODO Keep query params */
                navigate('/notes');
              }}
            />
          </div>
        </div>
        <div
          className={`${styles.lineTwo} ${!isCollapsed ? styles.expanded : ''}`}
        >
          <StarToggle
            starred={note.isStarred}
            onChange={() =>
              dispatch(
                updateNote({
                  id: note.id,
                  updates: { isStarred: !note.isStarred },
                }),
              )
            }
          />
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
