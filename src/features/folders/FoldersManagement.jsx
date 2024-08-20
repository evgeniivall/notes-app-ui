import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import FolderItem from './FolderItem';
import { AddFolderIcon } from '../../icons/icons';
import {
  createFolder,
  deleteFolder,
  selectFolders,
  updateFolder,
} from './foldersSlice';
import { FOLDER_COLOR_OPTIONS } from '../../constants/constants';
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

const getFolderIndexes = (folderIds, folders) => {
  const indices = folderIds
    .map((id) => folders.findIndex((folder) => folder.id === id))
    .filter((index) => index !== -1);

  return indices;
};

function FoldersManagement() {
  const folders = useSelector(selectFolders);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    const unorganizedNotesCount = notes.reduce((cnt, note) => {
      return note.folderId === '0' ? cnt + 1 : cnt;
    }, 0);

    dispatch(
      updateFolder({
        id: '0',
        updates: { notesCnt: unorganizedNotesCount },
      }),
    );
  }, [notes, dispatch]);

  const getActiveFolderIndicesFromLocation = useCallback(() => {
    const params = new URLSearchParams(location.search);
    const selectedFolders = params.get('folders');
    return selectedFolders
      ? getFolderIndexes(selectedFolders.split(','), folders)
      : [];
  }, [location.search, folders]);

  const activeFolderIndices = getActiveFolderIndicesFromLocation();

  const updateUrlParams = (newActiveFolderIndices, needMapping = true) => {
    const params = new URLSearchParams(location.search);
    if (newActiveFolderIndices.length > 0) {
      const activeFolderIds = needMapping
        ? newActiveFolderIndices.map((index) => folders[index].id)
        : newActiveFolderIndices;
      params.set('folders', activeFolderIds.join(','));
    } else {
      params.delete('folders');
    }
    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: true },
    );
  };

  const handleCreateFolder = () => {
    const newFolder = {
      name: generateNewFolderName(folders),
      color: FOLDER_COLOR_OPTIONS[0],
    };
    const action = dispatch(createFolder(newFolder));
    updateUrlParams([action.payload.id], false);
  };

  const handleDeleteFolder = (index) => {
    dispatch(deleteFolder({ id: folders[index].id }));
    updateUrlParams([]);
  };

  const handleFolderClick = (index) => {
    if (isInEditMode) {
      updateUrlParams([index]);
    } else {
      const newActiveFolderIndices = activeFolderIndices.includes(index)
        ? activeFolderIndices.filter((i) => i !== index)
        : [...activeFolderIndices, index];
      updateUrlParams(newActiveFolderIndices);
    }
  };

  const handleFolderUpdate = useCallback(
    (id, updates) => dispatch(updateFolder({ id, updates })),
    [dispatch],
  );

  const handleToggleEditMode = () => {
    if (!isInEditMode) {
      updateUrlParams([]);
    }
    setIsInEditMode((prevMode) => !prevMode);
  };

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
            handleUpdate={handleFolderUpdate}
            nameIsUnique={(name) => !folderNameIsExist(name, folders)}
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
