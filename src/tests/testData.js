/* eslint-disable no-case-declarations */
function getRandomDate(range) {
  const now = new Date();
  let startDate, endDate;

  switch (range) {
    case 'today':
      startDate = new Date(now);
      endDate = new Date(now);
      break;

    case 'this week':
      startDate = new Date(now);
      const dayOfWeek = now.getDay();
      const dayOffset = dayOfWeek === 0 ? -6 : 1; // Adjust if today is Sunday (0), start from last Monday
      startDate.setDate(now.getDate() - dayOfWeek + dayOffset); // Start on Monday
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); // End on Sunday
      if (endDate > now) endDate = new Date(now); // Prevent future date
      break;

    case 'this month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Start of this month
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // End of this month
      if (endDate > now) endDate = new Date(now); // Prevent future date
      break;

    case 'this year':
      startDate = new Date(now.getFullYear(), 0, 1); // Start of this year
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // End on today
      break;

    default:
      throw new Error(
        "Invalid range provided. Use 'today', 'this week', 'this month', or 'this year'.",
      );
  }

  // Generate random date within the specified range
  const randomTime =
    startDate.getTime() +
    Math.random() * (endDate.getTime() - startDate.getTime());
  return new Date(randomTime).toISOString();
}

export default {
  folders: [
    { name: 'Personal', color: 'red' },
    { name: 'Work', color: 'blue' },
    { name: 'Notes App Project', color: 'yellow' },
    { name: 'Hobby', color: 'green' },
  ],
  notes: [
    {
      title: 'Notes App Project Description',
      folderName: 'Notes App Project',
      tags: ['Project', 'Ideas'],
      isStarred: true,
      lastUpdated: getRandomDate('today'),
      body: 'Notes App Project\n\nProject Description\nNotes App (working title) is a note-taking application developed as a practical project to sharpen full-stack development skills. It leverages modern web technologies and follows a microservices architecture to ensure modularity and scalability. While the current version includes core note-taking features, future phases aim to introduce AI-powered enhancements to improve note organization and user experience.\n\nCurrent State\nThe project is currently in its early stages, featuring basic functionality without backend integration. All data is stored locally in the browser. Check the roadmap section to see upcoming features.\n\nFeatures:\n - Dark Mode: A visually appealing dark-themed design.\n - Responsive Design: Fully adapted for both mobile and desktop devices.\n - Folders: Organize your notes into custom folders, with the option to choose folder colors for better categorization.\n - Tags: Create and assign tags to notes, and easily filter them based on tags.\n - Starred Notes: Mark important notes as starred for quick access.\n - Archive: Deleted notes are moved to an archive where you can permanently delete or restore them.',
    },
    {
      title: 'Grocery List',
      folderName: 'Personal',
      tags: ['Personal', 'Lists'],
      isStarred: false,
      lastUpdated: getRandomDate('today'),
    },
    {
      title: 'Work Goals for Q4',
      folderName: 'Work',
      tags: ['Work', 'Important'],
      isStarred: true,
      lastUpdated: getRandomDate('this week'),
    },
    {
      title: 'Travel Packing Checklist',
      tags: ['Travel', 'Personal', 'Lists'],
      isStarred: false,
      lastUpdated: getRandomDate('this week'),
    },
    {
      title: 'Project Timeline and Milestones',
      folderName: 'Work',
      tags: ['Project X', 'Work'],
      isStarred: true,
      lastUpdated: getRandomDate('this month'),
    },
    {
      title: 'Top Places to Visit This Year',
      tags: ['Travel', 'Ideas', 'Lists'],
      isStarred: false,
      lastUpdated: getRandomDate('this month'),
    },
    {
      title: 'Personal Goals and Resolutions for the New Year',
      folderName: 'Personal',
      tags: ['Personal', 'Ideas'],
      isStarred: true,
      lastUpdated: getRandomDate('this year'),
    },
  ],
};
