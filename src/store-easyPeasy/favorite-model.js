import { action, persist } from "easy-peasy";

// Helper function to load favorites from localStorage
const loadFavoritesFromLocalStorage = () => {
  const storedFavorites = localStorage.getItem("favorites");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const favoriteModel = persist({
  items: loadFavoritesFromLocalStorage(), // Initialize items from localStorage

  /**
   * Action to add a playlist ID to the favorites list
   * 'payload' represents the playlistId to be added
   */
  addToFavorite: action((state, payload) => {
    // Check if the playlist is already in the favorites
    if (state.items.includes(payload)) {
      // If it is, do nothing
      return;
    } else {
      // If not, add the playlistId to the 'items' array
      state.items.push(payload);
      localStorage.setItem("favorites", JSON.stringify(state.items)); // Save to localStorage
    }
  }),

  /**
   * Action to remove a playlist ID from the favorites list
   * 'payload' represents the playlistId to be removed
   */
  removeFromFavorite: action((state, payload) => {
    // Filter out the playlistId that needs to be removed
    state.items = state.items.filter((pId) => payload !== pId);
    localStorage.setItem("favorites", JSON.stringify(state.items)); // Save to localStorage
  }),
});

export default favoriteModel;
