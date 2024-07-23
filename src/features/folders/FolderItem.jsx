import { EditIcon, TrashIcon } from '../../icons/icons';
import { folderColorOptions } from '../../constants/constants';
import ColorPicker from './ColorPicker';
import ColorBox from './ColorBox';
import Button from '../../ui/Button';
import styles from './FolderItem.module.css';

function FolderItem({
  folder,
  inEditMode = false,
  isActive = false,
  onClick,
  handleDelete,
}) {
  const { name, color, notesCnt, isSystem } = folder;

  return (
    <li
      className={`${styles.folderItem} ${isActive ? styles.active : ''}`}
      onClick={inEditMode && (isSystem || isActive) ? undefined : onClick}
      style={{
        pointerEvents: isSystem && inEditMode ? 'none' : 'auto',
      }}
    >
      <div className={styles.container}>
        <ColorBox color={color} interactable={false} />
        <span className={styles.folderTitle}>{name}</span>
        {inEditMode ? (
          (isActive && (
            <Button
              type="tertiary"
              icon={<TrashIcon />}
              onClick={handleDelete}
            />
          )) ||
          (!isSystem && <EditIcon className={styles.editIcon} />)
        ) : (
          <div className={styles.counter}>
            <span className={styles.count}>{notesCnt}</span>
          </div>
        )}
      </div>
      {inEditMode && isActive && (
        <ColorPicker colorOptions={folderColorOptions} activeColor={color} />
      )}
    </li>
  );
}

export default FolderItem;
