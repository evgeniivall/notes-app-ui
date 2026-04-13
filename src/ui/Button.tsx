import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
  label?: string;
  type: 'primary' | 'secondary' | 'tertiary' | 'wired';
  size?: 'large' | 'medium';
}

function Button({ onClick, icon, label, type, size = 'large' }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[type]} ${styles[size]}`}
      onClick={onClick}
    >
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
