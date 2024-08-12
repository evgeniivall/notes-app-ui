import styles from './Button.module.css';

function Button({ onClick, icon, label, type }) {
  return (
    <button className={`${styles.button} ${styles[type]}`} onClick={onClick}>
      {icon}
      {label && (
        <span
          className={styles.label}
          style={!icon ? { textAlign: 'center' } : {}}
        >
          {label}
        </span>
      )}
    </button>
  );
}

export default Button;
