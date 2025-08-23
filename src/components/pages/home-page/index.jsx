import React, { useState } from "react";
import { useStoreState } from "easy-peasy";
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Container } from "@mui/system";
import PlaylistCardItem from "../../playlist-card-item";
import { Add } from "@mui/icons-material";
import GoToTopButton from "../../shared/go-to-top-button";
import CustomButton from "../../shared/custom-button";
import PlaylistForm from "../../playlist-form";

/**
 * HomePage Component
 * Displays a grid of playlists or a placeholder message if no playlists are available.
 */
const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Access playlists from the store
  const { data } = useStoreState((state) => state.playlists);
  const playlistArray = Object.values(data);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCardClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 100);
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url('/bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.9)", // darker overlay
          zIndex: 0,
        }}
      />

      <Container
        maxWidth={"lg"}
        sx={{
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Loader Overlay */}
        {loading && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 1000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backdropFilter: "blur(5px)",
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        )}

        {playlistArray.length > 0 ? (
          <Grid
            container
            alignItems="stretch"
            spacing={2}
            sx={{ pt: 12, pb: 8 }}
          >
            {playlistArray.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                mb={2}
                key={item.playlistId}
              >
                <PlaylistCardItem
                  playlistId={item.playlistId}
                  playlistThumbnail={item.playlistItems[0]?.thumbnails}
                  playlistTitle={item.playlistTitle}
                  channelTitle={item.channelTitle}
                  playlistItems={item.playlistItems}
                  path={"home"}
                  onCardClick={handleCardClick}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              textAlign: "center",
              color: "#fff",
            }}
          >
            {/* Empty Image */}
            <Box
              component="img"
              src="/empty.png"
              alt="No Playlists"
              sx={{
                width: isSmallScreen ? "220px" : "300px",
                height: "auto",
                mb: 2,
                pt: isSmallScreen ? 0 : 6,
              }}
            />

            <Typography variant="h5" gutterBottom>
              No Playlists Available!{" "}
              <span style={{ color: "orange" }}>
                Add One to Begin Your Journey!
              </span>
            </Typography>

            {/* Add Playlist Button */}
            <Box mt={1}>
              <CustomButton
                icon={Add}
                text="Add Playlist"
                onClick={handleClickOpen}
              />
            </Box>

            <PlaylistForm open={open} handleClose={handleClose} />
          </Box>
        )}
      </Container>

      {/* Go to Top Button */}
      <GoToTopButton />
    </Box>
  );
};

export default HomePage;
