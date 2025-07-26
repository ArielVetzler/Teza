export const generateArticle = (id) => {
  const titles = ['Breaking News: Market Hits Record High', 'Tech Giant Unveils New Gadget', 'Health Officials Warn of New Virus Strain', 'Global Summit Addresses Climate Change', 'Local Hero Saves Cat from Tree', 'Science Breakthrough: New Discovery', 'Art Exhibition Opens Downtown', 'Sports Finals: Unexpected Victory', 'Food Festival: Culinary Delights', 'Travel Guide: Hidden Gems'];
  const summaries = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.'];
  const allTags = ['finance', 'technology', 'health', 'politics', 'local', 'sports', 'entertainment', 'science', 'art', 'food', 'travel', 'environment', 'education', 'business', 'culture'];
  
  const selectedTags = new Set();
  const numTags = Math.floor(Math.random() * (allTags.length - 2)) + 2; // Generate between 2 and allTags.length unique tags
  while (selectedTags.size < numTags) {
    selectedTags.add(allTags[Math.floor(Math.random() * allTags.length)]);
  }

  return {
    id: `article-${id}`,
    title: titles[Math.floor(Math.random() * titles.length)],
    summary: summaries[Math.floor(Math.random() * summaries.length)],
    tags: Array.from(selectedTags),
  };
};

export const generateUser = (id) => {
  const allInterests = ['finance', 'technology', 'health', 'politics', 'local', 'sports', 'entertainment', 'science', 'art', 'food', 'travel', 'environment', 'education', 'business', 'culture'];
  
  const selectedInterests = new Set();
  const numInterests = Math.floor(Math.random() * (allInterests.length - 1)) + 1; // Generate between 1 and allInterests.length unique interests
  while (selectedInterests.size < numInterests) {
    selectedInterests.add(allInterests[Math.floor(Math.random() * allInterests.length)]);
  }

  return {
    id: `user-${id}`,
    interests: Array.from(selectedInterests),
  };
};
