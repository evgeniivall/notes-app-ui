import { isToday, isThisWeek, isThisMonth, isThisYear } from 'date-fns';
import { Note } from '../../types';

interface NoteGroup {
  name: string;
  notes: Note[];
}

export function groupNotesByDate(notes: Note[]): NoteGroup[] {
  const groups: Record<string, Note[]> = {
    today: [],
    thisWeek: [],
    thisMonth: [],
    thisYear: [],
    older: [],
  };

  notes
    .sort((a, b) => new Date(b.lastUpdatedDate).getTime() - new Date(a.lastUpdatedDate).getTime())
    .forEach((note) => {
      const noteDate = new Date(note.lastUpdatedDate);
      if (isToday(noteDate)) {
        groups.today.push(note);
      } else if (isThisWeek(noteDate)) {
        groups.thisWeek.push(note);
      } else if (isThisMonth(noteDate)) {
        groups.thisMonth.push(note);
      } else if (isThisYear(noteDate)) {
        groups.thisYear.push(note);
      } else {
        groups.older.push(note);
      }
    });

  return [
    { name: 'Today', notes: groups.today },
    { name: 'This Week', notes: groups.thisWeek },
    { name: 'This Month', notes: groups.thisMonth },
    { name: 'This Year', notes: groups.thisYear },
    { name: 'Older', notes: groups.older },
  ].filter((group) => group.notes && group.notes.length > 0);
}
