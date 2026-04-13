import { getCSSVariable } from '../../utils/helpers';
import { RestoreIcon, TrashWiredIcon } from '../../icons/icons';
import { createNote, deleteNote } from './notesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectFolderById } from '../folders/foldersSlice';
import { Note } from '../../types';
import Button from '../../ui/Button';
import styles from './DeletedNoteItem.module.css';

interface DeletedNoteItemProps {
  noteData: Note;
}

/* TODO: Avoid code dublication, merge with NoteItem */
const DeletedNoteItem = ({ noteData }: DeletedNoteItemProps) => {
  const { id, title, body, folderId, tags } = noteData;
  const dispatch = useAppDispatch();
  const folder = useAppSelector((state) => selectFolderById(state, folderId));

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
            dispatch(createNote({ title, body, folderId: folder?.id || '0', tags }));
          }}
        />
        <Button
          icon={<TrashWiredIcon className={styles.icon} />}
          type="tertiary"
          size="medium"
          onClick={() => dispatch(deleteNote({ id, type: 'hard', updateFolder: false }))}
        />
      </div>
    </div>
  );
};

export default DeletedNoteItem;
