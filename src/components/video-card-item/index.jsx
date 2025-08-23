import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { PlayCircleOutline } from "@mui/icons-material";

/**
 * VideoCardItem component displays a video card with a thumbnail and title.
 *
 * @param {string} title - The title of the video.
 * @param {Object} thumbnails - The thumbnails of the video.
 * @param {string} videoId - The unique video ID.
 * @param {Array} videos - Array of video IDs in the playlist.
 * @param {string} playlistId - The ID of the playlist.
 *
 * @returns {JSX.Element} The rendered VideoCardItem component.
 */
const VideoCardItem = ({ title, thumbnails, videoId, videos, playlistId }) => {
  const videoIndex = videos.indexOf(videoId);

  return (
    <div>
      <div
        style={{
          // backgroundColor: "#efefef",
          height: "300",
          display: "flex",
          flexDirection: "column",
          margin: 2,
        }}
      >
        <Link
          to={`/player/${playlistId}/${videoIndex}?videoId=${videoId}`}
          style={{ textDecoration: "none" }}
        >
          <CardMedia
            component="img"
            image={thumbnails?.url}
            alt={title}
            sx={{
              height: "180",
              width: "320",
              borderRadius: "5%",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />

          <CardContent sx={{ display: "flex" }}>
            <PlayCircleOutline sx={{ marginRight: "0.3rem", color: "#fff" }} />
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ color: "#fff" }}
            >
              {`${title.length > 50 ? title.substr(0, 50) + "..." : title}`}
            </Typography>
          </CardContent>
        </Link>
      </div>
    </div>
  );
};

// PropTypes validation
VideoCardItem.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnails: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  videoId: PropTypes.string.isRequired,
  videos: PropTypes.arrayOf(PropTypes.string).isRequired,
  playlistId: PropTypes.string.isRequired,
};

export default VideoCardItem;
