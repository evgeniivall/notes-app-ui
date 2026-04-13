import { useState } from 'react';
import { StarFilledIcon, StarOutlineIcon } from '../icons/icons';
import styles from './StarToggle.module.css';

interface StarToggleProps {
  starred?: boolean;
  onChange?: (isStarred: boolean) => void;
}

function StarToggle({ starred = false, onChange }: StarToggleProps) {
  const [isStarred, setIsStarred] = useState(starred);

  const handleToggle = () => {
    const newStarredState = !isStarred;
    setIsStarred(newStarredState);
    if (onChange) {
      onChange(newStarredState);
    }
  };

  return (
    <button
      className={`${styles.starToggle} ${isStarred ? styles.starred : ''}`}
      onClick={handleToggle}
    >
      {isStarred ? (
        <StarFilledIcon className={styles.starIcon} />
      ) : (
        <StarOutlineIcon className={styles.starIcon} />
      )}
    </button>
  );
}

export default StarToggle;
