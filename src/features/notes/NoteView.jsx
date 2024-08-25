import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote, updateNote } from './notesSlice';
import NoteHeader from './NoteHeader';
import styles from './NoteView.module.css';

function NoteView({ note }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(note.title || '');
  const [body, setBody] = useState(note.body || note.title || '');

  const titleRef = useRef(title);
  const bodyRef = useRef(body);
  const isUpdated = useRef(false);

  // eslint-disable-next-line no-undef
  const isFirstRender = useRef(process.env.NODE_ENV === 'development');

  // Sync refs with state
  useEffect(() => {
    titleRef.current = title;
    bodyRef.current = body;
  }, [title, body]);

  useEffect(() => {
    setTitle(note.title || '');
    setBody(note.body || note.title || '');
  }, [note.body, note.title]);

  const handleBodyChange = (e) => {
    const updatedBody = e.target.value;
    setBody(updatedBody);
    setTitle(updatedBody.substring(0, 128).trim().split('\n')[0]);
    isUpdated.current = true;
  };

  // Save note on unmount or noteId change
  useEffect(() => {
    return () => {
      // Skip saving on first render (development mode issue with Strict Mode)
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      const saveNote = () => {
        const currentTitle = titleRef.current;
        const currentBody = bodyRef.current;

        if (!currentTitle || !currentBody) {
          dispatch(deleteNote({ id: note.id }));
        } else if (isUpdated.current) {
          dispatch(
            updateNote({
              id: note.id,
              updates: { title: currentTitle, body: currentBody },
            }),
          );
        }
        isUpdated.current = false;
      };

      saveNote();
    };
  }, [dispatch, note]);

  return (
    <div className={styles.noteView}>
      <NoteHeader note={{ ...note, title }} />
      <div className={styles.noteBodyWrapper}>
        <textarea
          className={styles.noteBody}
          value={body}
          onChange={handleBodyChange}
          placeholder="Start writing your note..."
        />
      </div>
    </div>
  );
}

export default NoteView;
