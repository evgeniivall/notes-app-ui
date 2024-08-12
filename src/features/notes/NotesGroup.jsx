import styles from './NotesGroup.module.css';

function NotesGroup({ name, children }) {
  return (
    <div className={styles.notesGroup}>
      <span className={styles.name}>{name}</span>
      <div className={styles.notes}>{children}</div>
    </div>
  );
}

export default NotesGroup;
