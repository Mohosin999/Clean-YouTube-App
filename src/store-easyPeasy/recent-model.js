import { action, persist } from "easy-peasy";

// Helper function to load recent playlists from localStorage
const loadRecentFromLocalStorage = () => {
  const storedRecent = localStorage.getItem("recent");
  return storedRecent ? JSON.parse(storedRecent) : [];
};

const recentModel = persist({
  items: loadRecentFromLocalStorage(), // Initialize items from localStorage

  /**
   * Action to add a playlist to the 'items' array
   * 'payload' represents the playlistId
   */
  addToRecent: action((state, payload) => {
    // If the playlist is already in the 'items' array, remove it
    if (state.items.indexOf(payload) !== -1) {
      state.items.splice(state.items.indexOf(payload), 1);
    }
    // Add the playlistId to the front of the 'items' array
    state.items.unshift(payload);
    // Ensure the array doesn't exceed 8 items
    state.items = state.items.slice(0, 8);
    // Save to localStorage
    localStorage.setItem("recent", JSON.stringify(state.items));
  }),

  /*
   * Action to remove a playlist from the 'items' array
   * 'payload' represents the playlistId to be removed
   */
  removeFromRecent: action((state, payload) => {
    // Filter out the playlistId that needs to be removed
    state.items = state.items.filter((pId) => payload !== pId);
    // Save to localStorage
    localStorage.setItem("recent", JSON.stringify(state.items));
  }),
});

export default recentModel;
