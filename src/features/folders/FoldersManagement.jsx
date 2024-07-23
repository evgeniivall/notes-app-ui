import Button from '../../ui/Button';
import FolderItem from './FolderItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddFolderIcon } from '../../icons/icons';
import { useSearchParams } from 'react-router-dom';
import { createFolder, deleteFolder } from './foldersSlice';
import { folderColorOptions } from '../../constants/constants';
import styles from './FoldersManagement.module.css';

const folderNameIsExist = (name, folders) => {
  return folders.some((folder) => folder.name === name);
};

const generateNewFolderName = (folders) => {
  let folderNumber = 0;
  let newFolderName;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    newFolderName =
      folderNumber === 0 ? 'New folder' : `New folder ${folderNumber}`;
    if (!folderNameIsExist(newFolderName, folders)) {
      return newFolderName;
    }
    folderNumber++;
  }
};

function FoldersManagement() {
  const folders = useSelector((state) => state.folders.folders);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [activeFolderIndices, setActiveFolderIndices] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const handleCreateFolder = () => {
    const newFolder = {
      name: generateNewFolderName(folders),
      color: folderColorOptions[0],
    };
    dispatch(createFolder(newFolder));
    setActiveFolderIndices([0]);
  };

  const handleDeleteFolder = (index) => {
    setActiveFolderIndices([]);
    dispatch(deleteFolder(folders[index].id));
  };

  const handleFolderClick = (index) => {
    if (isInEditMode) {
      setActiveFolderIndices([index]);
    } else {
      setActiveFolderIndices((prevIndices) => {
        if (prevIndices.includes(index)) {
          return prevIndices.filter((i) => i !== index);
        } else {
          return [...prevIndices, index];
        }
      });
    }
  };

  const handleToggleEditMode = () => {
    if (isInEditMode) {
      const selectedFolders = searchParams.get('folders');
      if (selectedFolders) {
        const folderIds = selectedFolders.split(',');
        const indices = folderIds
          .map((id) => folders.findIndex((folder) => folder.id === id))
          .filter((index) => index !== -1);
        setActiveFolderIndices(indices);
        console.log(indices);
      } else {
        setActiveFolderIndices([]);
      }
    } else {
      setActiveFolderIndices([]);
    }
    setIsInEditMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (!isInEditMode) {
      const params = new URLSearchParams(searchParams);
      if (activeFolderIndices.length > 0) {
        const activeFolderIds = activeFolderIndices.map(
          (index) => folders[index].id,
        );
        params.set('folders', activeFolderIds.join(','));
      } else {
        params.delete('folders');
      }
      setSearchParams(params);
    }
  }, [
    folders,
    activeFolderIndices,
    isInEditMode,
    setSearchParams,
    searchParams,
  ]);

  return (
    <div className={styles.foldersManagement}>
      <header className={styles.header}>
        <span className={styles.title}>Folders</span>
        <Button
          type="tertiary"
          label={isInEditMode ? 'Save' : 'Edit'}
          onClick={handleToggleEditMode}
        />
      </header>
      <ul className={styles.foldersList}>
        {folders.map((folder, index) => (
          <FolderItem
            folder={folder}
            key={folder.id}
            inEditMode={isInEditMode}
            isActive={activeFolderIndices.includes(index)}
            onClick={() => handleFolderClick(index)}
            handleDelete={() => handleDeleteFolder(index)}
          />
        ))}
        {isInEditMode && (
          <Button
            type="secondary"
            icon={<AddFolderIcon />}
            label="Create new folder"
            onClick={handleCreateFolder}
          />
        )}
      </ul>
    </div>
  );
}

export default FoldersManagement;
