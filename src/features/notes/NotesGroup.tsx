import React from 'react';
import styles from './NotesGroup.module.css';

interface NotesGroupProps {
  name?: string | false;
  children: React.ReactNode;
}

function NotesGroup({ name, children }: NotesGroupProps) {
  return (
    <div className={styles.notesGroup}>
      {name && <span className={styles.name}>{name}</span>}
      <div className={styles.notes}>{children}</div>
    </div>
  );
}

export default NotesGroup;
