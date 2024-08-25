import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectNoteById } from './notesSlice';
import NotesList from './NotesList';
import NoteView from './NoteView';
import styles from './NotesDisplay.module.css';

function NotesDisplay() {
  const { noteId } = useParams();
  const [savedNote, setSavedNote] = useState(undefined);

  const selectedNote = useSelector((state) =>
    noteId ? selectNoteById(state, noteId) : null,
  );

  useEffect(() => {
    if (noteId && selectedNote) {
      setSavedNote({ ...selectedNote });
    }
  }, [noteId, selectedNote]);

  const note = noteId ? selectedNote : savedNote;

  return (
    <div className={styles.notesWrapper}>
      <div
        className={`${styles.notesListWrapper} ${!noteId ? styles.noteHidden : ''}`}
      >
        <NotesList activeNoteId={noteId} />
      </div>
      <div
        className={`${styles.noteWrapper} ${!noteId ? styles.noteHidden : ''}`}
      >
        {note && <NoteView note={note} key={note.id} />}
      </div>
    </div>
  );
}

export default NotesDisplay;
