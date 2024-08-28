import styles from './Tag.module.css';

function Tag({ name, icon, style = 'solid', isSelected, onClick }) {
  return (
    <button
      className={`${styles.tag} ${isSelected ? styles.selected : ''} ${styles[style]}`}
      onClick={onClick}
      style={{
        pointerEvents: onClick ? 'auto' : 'none',
      }}
    >
      {icon && icon}
      {name && name}
    </button>
  );
}

export default Tag;
