import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTag } from '../features/tags/tagsSlice';
import { createFolder, deleteFolder } from '../features/folders/foldersSlice';
import { createNote, deleteNote } from '../features/notes/notesSlice';
import { useNavigate } from 'react-router-dom';
import testData from './testData';
import store from '../store';

const deleteExistingData = (dispatch, tags, folders, notes) => {
  tags.forEach((tag) => dispatch(deleteTag({ name: tag.name })));
  folders.forEach((folder) => dispatch(deleteFolder({ id: folder.id })));
  notes.forEach((note) => dispatch(deleteNote({ id: note.id, type: 'hard' })));
};

const createFolders = (dispatch, folderData) => {
  folderData.forEach((folder) =>
    dispatch(
      createFolder({
        name: folder.name,
        color: folder.color,
      }),
    ),
  );
};

const createNotes = (dispatch, noteData) => {
  const updatedFolders = store.getState().folders.folders;

  if (updatedFolders.length > 0) {
    noteData.forEach((note) => {
      const folder = note.folderName
        ? updatedFolders.find((f) => f.name === note.folderName)
        : undefined;
      dispatch(
        createNote({
          title: note.title,
          folderId: folder?.id,
          tags: note.tags || [],
          isStarred: note.isStarred,
          lastUpdatedDate: note.lastUpdated,
          body: note.body,
        }),
      );
    });
  }
};

const PopulateStoreWithTestData = () => {
  const exec = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tags = useSelector((state) => state.tags.tags);
  const folders = useSelector((state) => state.folders.folders);
  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    if (exec.current) return;
    exec.current = true;

    const { folders: folderData, notes: noteData } = testData;

    deleteExistingData(dispatch, tags, folders, notes);
    createFolders(dispatch, folderData);
    setTimeout(() => {
      createNotes(dispatch, noteData);
      navigate('/notes');
    }, 0);
  }, [dispatch, navigate, tags, folders, notes]);

  return null;
};

export default PopulateStoreWithTestData;
