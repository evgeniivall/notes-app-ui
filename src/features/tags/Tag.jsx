import styles from './Tag.module.css';

function Tag({ name, isSelected, onClick }) {
  return (
    <button
      className={`${styles.tag} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default Tag;
