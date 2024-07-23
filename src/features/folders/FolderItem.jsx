import { useCallback, useEffect, useState } from 'react';
import { EditIcon, TrashIcon } from '../../icons/icons';
import { folderColorOptions } from '../../constants/constants';
import ColorPicker from './ColorPicker';
import ColorBox from './ColorBox';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import styles from './FolderItem.module.css';

function FolderItem({
  folder,
  inEditMode = false,
  isActive = false,
  onClick,
  handleDelete,
  handleUpdate,
  nameIsUnique,
}) {
  const { name, color, notesCnt, isSystem } = folder;
  const [nameValidationError, setNameValidationError] = useState('');
  const [tempFolderName, setTempFolderName] = useState(folder.name);

  const handleNameChange = (newName) => {
    let error = '';
    const trimmedNewname = newName.trim();
    if (trimmedNewname === '') error = 'Folder name cannot be empty.';
    else if (!nameIsUnique(trimmedNewname) && trimmedNewname !== name)
      error = 'Folder with such name already exists. Try another one.';
    else if (trimmedNewname.length > 24)
      error = 'Folder name cannot exceed 24 characters.';

    setTempFolderName(newName);
    setNameValidationError(error);
  };

  const handleColorChange = useCallback(
    (color) => handleUpdate(folder.id, { color }),
    [folder.id, handleUpdate],
  );

  /* Apply name updates when user exited edit mode or selected another folder */
  useEffect(() => {
    if (!inEditMode || (!isActive && tempFolderName !== name)) {
      if (nameValidationError === '') {
        handleUpdate(folder.id, { name: tempFolderName.trim() });
        setTempFolderName((name) => name.trim());
      } else {
        setNameValidationError('');
        setTempFolderName(name.trim());
      }
    }
  }, [
    isActive,
    inEditMode,
    tempFolderName,
    handleUpdate,
    nameValidationError,
    folder.id,
    name,
  ]);

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
        {inEditMode && isActive ? (
          <Input
            value={tempFolderName}
            error={nameValidationError}
            onChange={handleNameChange}
          />
        ) : (
          <span className={styles.folderTitle}>{name}</span>
        )}
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
        <ColorPicker
          colorOptions={folderColorOptions}
          activeColor={color}
          onChange={handleColorChange}
        />
      )}
    </li>
  );
}

export default FolderItem;
