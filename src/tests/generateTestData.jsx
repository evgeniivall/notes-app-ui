import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTag, deleteTag } from '../features/tags/tagsSlice';
import { createFolder, deleteFolder } from '../features/folders/foldersSlice';
import { createNote, deleteNote } from '../features/notes/notesSlice';
import { useNavigate } from 'react-router-dom';
import testData from './testData';
import store from '../store';

const deleteExistingData = (dispatch, tags, folders, notes) => {
  tags.forEach((tag) => dispatch(deleteTag({ id: tag.id })));
  folders.forEach((folder) => dispatch(deleteFolder({ id: folder.id })));
  notes.forEach((note) => dispatch(deleteNote({ id: note.id })));
};

const createTagsAndFolders = (dispatch, tagData, folderData) => {
  tagData.forEach((tag) => dispatch(createTag({ name: tag.name })));
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
  const updatedTags = store.getState().tags.tags;
  const updatedFolders = store.getState().folders.folders;

  if (updatedTags.length > 0 && updatedFolders.length > 0) {
    noteData.forEach((note) => {
      const folder = note.folderName
        ? updatedFolders.find((f) => f.name === note.folderName)
        : undefined;
      const tagIds = note.tagNames
        .map((tagName) => {
          const tag = updatedTags.find((t) => t.name === tagName);
          return tag ? tag.id : null;
        })
        .filter((id) => id !== null);
      dispatch(
        createNote({
          title: note.title,
          folderId: folder?.id,
          tagIds,
          isStarred: note.isStarred,
          lastUpdatedDate: note.lastUpdated,
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

    const { tags: tagData, folders: folderData, notes: noteData } = testData;

    deleteExistingData(dispatch, tags, folders, notes);
    createTagsAndFolders(dispatch, tagData, folderData);
    setTimeout(() => {
      createNotes(dispatch, noteData);
      navigate('/notes');
    }, 0);
  }, [dispatch, navigate, tags, folders, notes]);

  return null;
};

export default PopulateStoreWithTestData;
