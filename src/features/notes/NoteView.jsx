import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NoteHeader from './NoteHeader';
import { deleteNote, selectNoteById, updateNote } from './notesSlice';
import styles from './NoteView.module.css';

function NoteView() {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const note = useSelector((state) => selectNoteById(state, noteId));

  const [title, setTitle] = useState(note.title || '');
  const [body, setBody] = useState(note.body || note.title || '');

  const titleRef = useRef(title);
  const bodyRef = useRef(body);
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
          dispatch(deleteNote({ id: noteId }));
        } else {
          dispatch(
            updateNote({
              id: noteId,
              updates: { title: currentTitle, body: currentBody },
            }),
          );
        }
      };

      saveNote();
    };
  }, [dispatch, noteId]);

  return (
    <div className={styles.noteView}>
      <NoteHeader note={{ ...note, title }} />
      <textarea
        className={styles.noteBody}
        value={body}
        onChange={handleBodyChange}
        placeholder="Start writing your note..."
      />
    </div>
  );
}

export default NoteView;
