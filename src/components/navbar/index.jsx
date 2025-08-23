import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import Link from "@mui/material/Link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import DrawerComp from "../../components/shared/drawer";
import PlaylistForm from "../playlist-form";
import { Add, AllOut, Favorite, Home } from "@mui/icons-material";
import CustomButton from "../shared/custom-button";

/**
 * Navbar component renders the header for the application, adjusting its layout
 * based on the screen size. On small screens, it shows a drawer for navigation,
 * while on larger screens, it displays additional buttons for user interactions.
 */
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:992px)");

  /**
   * Opens the PlaylistForm modal when the "Add Playlist" button is clicked
   */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /**
   * Closes the PlaylistForm modal
   */
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#022c43" }}>
        <Container>
          <Toolbar sx={{ padding: "0px !important" }}>
            {isSmallScreen ? (
              <>
                <Link
                  to="/"
                  component={RouterLink}
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#efefef",
                      userSelect: "none",
                      letterSpacing: "0.2rem",
                    }}
                  >
                    Clean•YouTube
                  </Typography>
                </Link>
                <Box sx={{ flexGrow: 1 }} />
                <DrawerComp handleClickOpen={handleClickOpen} />
                <PlaylistForm open={open} handleClose={handleClose} />
              </>
            ) : (
              <>
                <Link
                  to="/"
                  component={RouterLink}
                  sx={{
                    textDecoration: "none",
                    "&:hover": {
                      transform: "scale(1.1)",
                      transition: "transform 0.3s ease-in-out",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#efefef",
                      userSelect: "none",
                      letterSpacing: "0.2rem",
                    }}
                  >
                    Clean•YouTube
                  </Typography>
                </Link>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: "flex", gap: 1 }}>
                  {/* Home Button */}
                  <CustomButton
                    to="/"
                    component={RouterLink}
                    icon={Home}
                    text="Home"
                  />
                  {/* Favorite Button */}
                  <CustomButton
                    to="/favorites"
                    component={RouterLink}
                    icon={Favorite}
                    text="Favorites"
                  />
                  {/* Recent Button */}
                  <CustomButton
                    to="/recents"
                    component={RouterLink}
                    icon={AllOut}
                    text="Recents"
                  />
                  {/* Action Button Named `Add Playlist` */}
                  <CustomButton
                    icon={Add}
                    text="Add Playlist"
                    onClick={handleClickOpen}
                  />

                  <PlaylistForm open={open} handleClose={handleClose} />
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;

// import React, { useState } from "react";
// import { Link as RouterLink } from "react-router-dom";
// import { useMediaQuery, ClickAwayListener } from "@mui/material";
// import Link from "@mui/material/Link";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import { Container } from "@mui/system";
// import { motion, AnimatePresence } from "framer-motion";
// import DrawerComp from "../../components/shared/drawer";
// import PlaylistForm from "../playlist-form";
// import { Add, AllOut, Favorite, Home, Search } from "@mui/icons-material";
// import CustomButton from "../shared/custom-button";
// import GeminiDemo from "../gemini-demo";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const isSmallScreen = useMediaQuery("(max-width:992px)");

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const toggleSearch = () => {
//     setSearchOpen((prev) => !prev);
//   };

//   const handleClickAway = () => {
//     if (searchOpen) setSearchOpen(false);
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="fixed" sx={{ backgroundColor: "#022c43" }}>
//         <Container>
//           <Toolbar sx={{ padding: "0px !important" }}>
//             {isSmallScreen ? (
//               <>
//                 <Link
//                   to="/"
//                   component={RouterLink}
//                   sx={{ textDecoration: "none" }}
//                 >
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       color: "#efefef",
//                       userSelect: "none",
//                       letterSpacing: "0.2rem",
//                     }}
//                   >
//                     Clean•YouTube
//                   </Typography>
//                 </Link>
//                 <Box sx={{ flexGrow: 1 }} />
//                 <DrawerComp handleClickOpen={handleClickOpen} />
//                 <PlaylistForm open={open} handleClose={handleClose} />
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/"
//                   component={RouterLink}
//                   sx={{
//                     textDecoration: "none",
//                     "&:hover": {
//                       transform: "scale(1.1)",
//                       transition: "transform 0.3s ease-in-out",
//                     },
//                   }}
//                 >
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       color: "#efefef",
//                       userSelect: "none",
//                       letterSpacing: "0.2rem",
//                     }}
//                   >
//                     Clean•YouTube
//                   </Typography>
//                 </Link>
//                 <Box sx={{ flexGrow: 1 }} />
//                 <Box sx={{ display: "flex", gap: 1 }}>
//                   {/* Home Button */}
//                   <CustomButton
//                     to="/"
//                     component={RouterLink}
//                     icon={Home}
//                     text="Home"
//                   />
//                   {/* Favorite Button */}
//                   <CustomButton
//                     to="/favorites"
//                     component={RouterLink}
//                     icon={Favorite}
//                     text="Favorites"
//                   />
//                   {/* Recent Button */}
//                   <CustomButton
//                     to="/recents"
//                     component={RouterLink}
//                     icon={AllOut}
//                     text="Recents"
//                   />
//                   {/* Search Playlist Button */}
//                   <CustomButton
//                     icon={Search}
//                     text="Search Playlist"
//                     onClick={toggleSearch}
//                   />
//                   {/* Add Playlist Button */}
//                   <CustomButton
//                     icon={Add}
//                     text="Add Playlist"
//                     onClick={handleClickOpen}
//                   />

//                   <PlaylistForm open={open} handleClose={handleClose} />
//                 </Box>
//               </>
//             )}
//           </Toolbar>
//         </Container>
//       </AppBar>

//       {/* Animated Search Bar */}
//       <AnimatePresence>
//         {searchOpen && (
//           <ClickAwayListener onClickAway={handleClickAway}>
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.4, ease: "easeInOut" }}
//               style={{
//                 background: "#03324e",
//                 overflow: "hidden",
//                 marginTop: isSmallScreen ? 56 : 64, // 👈 push below navbar
//                 position: "relative",
//                 zIndex: 1100, // keep it above page content
//               }}
//             >
//               <Container sx={{ py: 2 }}>
//                 <GeminiDemo />
//               </Container>
//             </motion.div>
//           </ClickAwayListener>
//         )}
//       </AnimatePresence>
//     </Box>
//   );
// };

// export default Navbar;
