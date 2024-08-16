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
      startDate.setDate(now.getDate() - dayOfWeek); // Start of the week (Sunday)
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); // End of the week (Saturday)
      break;
    case 'this month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Start of this month
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // End of this month
      break;
    case 'this year':
      const currentMonth = now.getMonth();
      startDate = new Date(now.getFullYear(), 0, 1); // Start of this year
      endDate = new Date(now.getFullYear(), currentMonth, 1); // End of the previous month
      endDate.setDate(endDate.getDate() - 1); // Last day of the previous month
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
  tags: [
    { name: 'Meeting notes' },
    { name: 'Important' },
    { name: 'Recipes' },
    { name: 'Work' },
    { name: 'Personal' },
    { name: 'Health' },
    { name: 'Fitness' },
    { name: 'Project' },
    { name: 'Ideas' },
    { name: 'Travel' },
    { name: 'Hobby' },
  ],
  folders: [
    { name: 'Personal', color: 'red' },
    { name: 'Work', color: 'blue' },
    { name: 'Notes App Project', color: 'yellow' },
    { name: 'Health & Sport', color: 'green' },
    { name: 'Hobby', color: 'magenta' },
  ],
  notes: [
    {
      title: 'Grocery List',
      folderName: 'Personal',
      tagNames: ['Personal', 'Recipes'],
      isStarred: false,
      lastUpdated: getRandomDate('today'),
    },
    {
      title: 'Weekly Team Meeting Agenda',
      // folderName: 'Work',
      tagNames: ['Meeting notes', 'Important'],
      isStarred: true,
      lastUpdated: getRandomDate('today'),
    },
    {
      title: 'My Fitness Goals for the Year',
      folderName: 'Health & Sport',
      tagNames: ['Health', 'Fitness'],
      isStarred: false,
      lastUpdated: getRandomDate('today'),
    },
    {
      title: 'Ideas for the Notes App Project',
      folderName: 'Notes App Project',
      tagNames: ['Project', 'Ideas'],
      isStarred: true,
      lastUpdated: getRandomDate('this week'),
    },
    {
      title: 'Travel Packing Checklist',
      // folderName: 'Personal',
      // tagNames: ['Travel', 'Personal'],
      isStarred: false,
      lastUpdated: getRandomDate('this week'),
    },
    {
      title: 'Favorite Recipes to Try',
      // folderName: 'Personal',
      tagNames: ['Recipes', 'Important'],
      isStarred: false,
      lastUpdated: getRandomDate('this week'),
    },
    {
      title: 'Upcoming Hobby Projects',
      folderName: 'Hobby',
      tagNames: ['Hobby', 'Ideas'],
      isStarred: false,
      lastUpdated: getRandomDate('this week'),
    },
    {
      title: 'Work Goals for Q4',
      // folderName: 'Work',
      tagNames: ['Work', 'Important'],
      isStarred: true,
      lastUpdated: getRandomDate('this week'),
    },
    {
      title: 'Health Tips to Follow',
      folderName: 'Health & Sport',
      tagNames: ['Health', 'Fitness'],
      isStarred: false,
      lastUpdated: getRandomDate('this week'),
    },
    {
      title: 'Project Timeline and Milestones',
      folderName: 'Notes App Project',
      tagNames: ['Project', 'Work'],
      isStarred: true,
      lastUpdated: getRandomDate('this month'),
    },
    {
      title: 'Top Places to Visit This Year',
      // folderName: 'Personal',
      tagNames: ['Travel', 'Ideas'],
      isStarred: false,
      lastUpdated: getRandomDate('this month'),
    },
    {
      title: 'Book List for Summer Reading',
      folderName: 'Hobby',
      tagNames: ['Hobby'],
      isStarred: false,
      lastUpdated: getRandomDate('this month'),
    },
    {
      title: 'Recipe for Homemade Pizza',
      folderName: 'Personal',
      tagNames: ['Recipes'],
      isStarred: false,
      lastUpdated: getRandomDate('this month'),
    },
    {
      title:
        'Work and Life Balance Strategies for Better Productivity and Well-Being',
      // folderName: 'Work',
      tagNames: ['Work', 'Health', 'Important'],
      isStarred: true,
      lastUpdated: getRandomDate('this month'),
    },
    {
      title: 'Crafting Ideas for the Winter Holiday Season',
      folderName: 'Hobby',
      tagNames: ['Hobby', 'Ideas'],
      isStarred: false,
      lastUpdated: getRandomDate('this month'),
    },
    {
      title: 'Weekly Progress Report for Notes App Development',
      folderName: 'Notes App Project',
      tagNames: ['Work', 'Project', 'Important'],
      isStarred: true,
      lastUpdated: getRandomDate('this month'),
    },
    {
      title: 'Personal Goals and Resolutions for the New Year',
      folderName: 'Personal',
      tagNames: ['Personal', 'Ideas'],
      isStarred: true,
      lastUpdated: getRandomDate('this month'),
    },
    {
      title: 'Fitness Routine: Daily Workouts to Stay in Shape',
      folderName: 'Health & Sport',
      tagNames: ['Fitness'],
      isStarred: false,
      lastUpdated: getRandomDate('this month'),
    },
    {
      title: 'Roadmap for Upcoming Projects and Deliverables at Work',
      folderName: 'Work',
      tagNames: ['Work', 'Project', 'Important'],
      isStarred: true,
      lastUpdated: getRandomDate('this year'),
    },
    {
      title: 'Healthy Eating Plan and Meal Prep Ideas',
      folderName: 'Health & Sport',
      tagNames: ['Health', 'Recipes', 'Fitness'],
      isStarred: false,
      lastUpdated: getRandomDate('this year'),
    },
  ],
};
