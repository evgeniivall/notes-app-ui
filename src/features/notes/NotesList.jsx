import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectDeletedNotes, selectNotes } from './notesSlice';
import { groupNotesByDate } from './notesGrouping';
import NoteItem from './NoteItem';
import DeletedNoteItem from './DeletedNoteItem';
import NotesGroup from './NotesGroup';
import styles from './NotesList.module.css';
import Button from '../../ui/Button';
import MessagePanel from '../../ui/MessagePanel';

function NotesList({ activeNoteId }) {
  const notes = useSelector(selectNotes);
  const deletedNotes = useSelector(selectDeletedNotes);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const filter = searchParams.get('filter') || '';
  const selectedTags = useMemo(
    () => searchParams.get('tags')?.split(',') || [],
    [searchParams],
  );
  const filteredNotes = useMemo(() => {
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';
    const folders = searchParams.get('folders')?.split(',') || [];

    if (filter === 'deleted') return deletedNotes;

    return notes.filter((note) => {
      /* Filter by tags */
      const hasTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => note.tags.includes(tag));

      /* Filter by search query */
      const matchesSearch =
        !searchQuery || note.title.toLowerCase().includes(searchQuery);

      /* Filter by folders */
      const inFolders = folders.length === 0 || folders.includes(note.folderId);

      /* Filter by starred */
      const starred = filter != 'starred' || note.isStarred;

      return hasTags && matchesSearch && inFolders && starred;
    });
  }, [notes, selectedTags, searchParams, deletedNotes, filter]);

  if (!notes.length && filter !== 'deleted')
    return (
      <MessagePanel
        title="No Notes Yet :("
        subtitle="Create your first note to get started and keep track of your thoughts and ideas."
        imageUrl="/images/notes-empty-state.png"
        button={
          <Button
            type="primary"
            label="Fill with test data"
            onClick={() => navigate('/testData')}
          />
        }
      />
    );

  if (!filteredNotes.length)
    return (
      <MessagePanel
        title="Oops! No notes were found."
        subtitle="Try adjusting your search criteria or resetting the filters."
        imageUrl="/images/no-search-results.png"
        button={
          <Button
            type="primary"
            label="Reset all filters"
            onClick={() =>
              navigate({ pathname: location.pathname, search: '' })
            }
          />
        }
      />
    );

  const groupedNotes = groupNotesByDate(filteredNotes);
  return (
    <div className={`${styles.notesList} `}>
      {groupedNotes.map(
        (group, index) =>
          group.notes.length > 0 && (
            <NotesGroup key={group.name} name={index !== 0 && group.name}>
              {group.notes.map((note) =>
                filter === 'deleted' ? (
                  <DeletedNoteItem noteData={note} key={note.id} />
                ) : (
                  <NoteItem
                    noteData={note}
                    isActive={note.id === activeNoteId}
                    selectedTags={selectedTags}
                    key={note.id}
                  />
                ),
              )}
            </NotesGroup>
          ),
      )}
    </div>
  );
}

export default NotesList;
