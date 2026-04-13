import { useState, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../hooks';
import { deleteNote, updateNote } from './notesSlice';
import { Note } from '../../types';
import NoteHeader from './NoteHeader';
import styles from './NoteView.module.css';

interface NoteViewProps {
  note: Note;
}

function NoteView({ note }: NoteViewProps) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(note.title || '');
  const [body, setBody] = useState(note.body || note.title || '');

  const titleRef = useRef<string>(title);
  const bodyRef = useRef<string>(body);
  const isUpdated = useRef<boolean>(false);
  const isFirstRender = useRef<boolean>(import.meta.env.DEV);

  useEffect(() => {
    titleRef.current = title;
    bodyRef.current = body;
  }, [title, body]);

  useEffect(() => {
    setTitle(note.title || '');
    setBody(note.body || note.title || '');
  }, [note.body, note.title]);

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedBody = e.target.value;
    setBody(updatedBody);
    setTitle(updatedBody.substring(0, 128).trim().split('\n')[0]);
    isUpdated.current = true;
  };

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
          dispatch(deleteNote({ id: note.id, type: 'hard' }));
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
