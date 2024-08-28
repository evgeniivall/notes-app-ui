import { getCSSVariable } from '../../utils/helpers';
import { RestoreIcon, TrashWiredIcon } from '../../icons/icons';
import { createNote, deleteNote } from './notesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectFolderById } from '../folders/foldersSlice';
import Button from '../../ui/Button';
import styles from './DeletedNoteItem.module.css';

/* Avoid code dublication, merge with NoteItem */
const DeletedNoteItem = ({ noteData }) => {
  const { id, title, body, folderId, tags } = noteData;
  const dispatch = useDispatch();
  const folder = useSelector((state) => selectFolderById(state, folderId));

  return (
    <div className={`${styles.note}`}>
      <div className={styles.folderIndicatorContainer}>
        <div
          className={styles.folderIndicator}
          style={{ backgroundColor: getCSSVariable('grey') }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.actionsContainer}>
        <Button
          icon={<RestoreIcon className={styles.icon} />}
          type="tertiary"
          size="medium"
          onClick={() => {
            dispatch(deleteNote({ id, type: 'hard' }));
            dispatch(
              createNote({ title, body, folderId: folder.id || '0', tags }),
            );
          }}
        />
        <Button
          icon={<TrashWiredIcon className={styles.icon} />}
          type="tertiary"
          size="medium"
          onClick={() =>
            dispatch(deleteNote({ id, type: 'hard', updateFolder: false }))
          }
        />
      </div>
    </div>
  );
};

export default DeletedNoteItem;
