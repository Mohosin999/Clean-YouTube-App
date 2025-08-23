import React, { useState } from "react";
import { useStoreState } from "easy-peasy";
import { Grid, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import VideoCardItem from "../../video-card-item";
import GoToTopButton from "../../shared/go-to-top-button";

/**
 * PlayerPage Component
 * Displays a list of videos within a playlist and provides search
 * functionality.
 */
const PlayerPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Get the playlist ID from URL parameters
  const { playlistId } = useParams();
  // Access playlist data from the store
  const { data } = useStoreState((state) => state.playlists);
  // Retrieve the current playlist using the ID
  const current = data[playlistId];

  // Responsive Design
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // If the playlist is not found, show a fallback message
  if (!current) {
    return (
      <Container
        maxWidth="lg"
        sx={{ paddingTop: isSmallScreen ? 10 : 12, textAlign: "center" }}
      >
        <h2>Playlist not found!</h2>
      </Container>
    );
  }

  // Array of videos in the current playlist
  const videoItemArray = current.playlistItems;

  // Filter the video list based on the search query
  const filteredPlaylistItem = videoItemArray.filter((playlistItem) =>
    playlistItem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <Container
        maxWidth="lg"
        sx={{ paddingTop: isSmallScreen ? 10 : 12, minHeight: "100vh" }}
      >
        {/* Search Bar */}
        <TextField
          placeholder="Search targeted videos"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            marginBottom: 3,
            width: "100%",
            backgroundColor: "#333", // Darker background
            borderRadius: "12px",
            "& .MuiOutlinedInput-root": {
              color: "#fff", // Text color for dark mode
              borderRadius: "12px",
              "& fieldset": {
                borderColor: "#555", // Border color
              },
              "&:hover fieldset": {
                borderColor: "#777", // Lighter border on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1e88e5", // Focus color
              },
            },
            "& .MuiInputBase-input": {
              color: "#fff", // Text color
            },
            "& .MuiInputLabel-root": {
              color: "#aaa", // Placeholder color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#1e88e5", // Placeholder focus color
            },
          }}
        />

        {filteredPlaylistItem.length > 0 ? (
          <Grid container alignItems="stretch" spacing={2}>
            {filteredPlaylistItem.map((item, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={item.contentDetails.videoId}
              >
                <VideoCardItem
                  title={item.title}
                  thumbnails={item.thumbnails}
                  videoId={item.contentDetails.videoId}
                  videos={filteredPlaylistItem.map(
                    (video) => video.contentDetails.videoId
                  )}
                  playlistId={playlistId}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <h3 style={{ textAlign: "center" }}>No videos found!</h3>
        )}
      </Container>

      {/* Go to Top Button */}
      <GoToTopButton />
    </div>
  );
};

export default PlayerPage;
