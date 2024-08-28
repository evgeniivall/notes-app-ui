import { useCallback, useEffect, useState } from 'react';
import { EditIcon, TrashIcon } from '../../icons/icons';
import {
  FOLDER_COLOR_OPTIONS,
  FOLDER_NAME_MAX_LENGTH,
} from '../../constants/constants';
import ColorPicker from './ColorPicker';
import ColorBox from './ColorBox';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import styles from './FolderItem.module.css';
import { normalizeWhitespace } from '../../utils/helpers';

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
    const trimmedNewname = normalizeWhitespace(newName);
    if (trimmedNewname === '') error = 'Folder name cannot be empty.';
    else if (!nameIsUnique(trimmedNewname) && trimmedNewname !== name)
      error = 'Folder with such name already exists. Try another one.';
    else if (trimmedNewname.length > FOLDER_NAME_MAX_LENGTH)
      error = 'Folder name is too long.';

    setTempFolderName(newName);
    setNameValidationError(error);
  };

  const handleColorChange = useCallback(
    (color) => handleUpdate(folder.id, { color }),
    [folder.id, handleUpdate],
  );

  /* Apply name updates when user exited edit mode or selected another folder */
  useEffect(() => {
    if ((!inEditMode || !isActive) && tempFolderName !== name) {
      if (nameValidationError === '') {
        handleUpdate(folder.id, { name: normalizeWhitespace(tempFolderName) });
        setTempFolderName((name) => normalizeWhitespace(name));
      } else {
        setNameValidationError('');
        setTempFolderName(normalizeWhitespace(name));
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
            <Button type="wired" icon={<TrashIcon />} onClick={handleDelete} />
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
          colorOptions={FOLDER_COLOR_OPTIONS}
          activeColor={color}
          onChange={handleColorChange}
        />
      )}
    </li>
  );
}

export default FolderItem;
