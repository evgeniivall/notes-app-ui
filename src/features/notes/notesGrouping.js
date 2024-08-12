import { isToday, isThisWeek, isThisMonth, isThisYear } from 'date-fns';

export function groupNotesByDate(notes) {
  const groups = {
    today: [],
    thisWeek: [],
    thisMonth: [],
    thisYear: [],
    older: [],
  };

  notes
    .sort((a, b) => new Date(b.lastUpdatedDate) - new Date(a.lastUpdatedDate))
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
  ];
}
