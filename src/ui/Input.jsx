import styles from './Input.module.css';

const Input = ({ label, value, onChange, error }) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${styles.inputField} ${error ? styles.inputError : ''}`}
        placeholder={label}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;
