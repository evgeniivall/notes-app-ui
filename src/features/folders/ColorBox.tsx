import { CheckIcon } from '../../icons/icons';
import { getCSSVariable } from '../../utils/helpers';
import { FolderColor } from '../../types';
import styles from './ColorBox.module.css';

interface ColorBoxProps {
  color: FolderColor;
  interactable?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

function ColorBox({ color, interactable = true, isActive = false, onClick }: ColorBoxProps) {
  return (
    <div
      className={`${styles.colorBoxContainer} ${isActive ? styles.active : ''}`}
      style={{
        color: getCSSVariable(color),
        pointerEvents: interactable ? 'auto' : 'none',
      }}
      onClick={interactable ? onClick : undefined}
    >
      <div
        className={styles.colorBox}
        style={{ backgroundColor: getCSSVariable(color) }}
      >
        {isActive && <CheckIcon />}
      </div>
    </div>
  );
}

export default ColorBox;
