import styles from './Input.module.css';

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const Input = ({ label, value, onChange, error }: InputProps) => {
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
