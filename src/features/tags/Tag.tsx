import React from 'react';
import styles from './Tag.module.css';

interface TagProps {
  name?: string;
  icon?: React.ReactNode;
  style?: 'solid' | 'wired';
  isSelected?: boolean;
  onClick?: () => void;
}

function Tag({ name, icon, style = 'solid', isSelected, onClick }: TagProps) {
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
