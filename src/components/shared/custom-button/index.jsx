import React from "react";
import PropTypes from "prop-types";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

/**
 * CustomButton Component
 * A reusable and customizable button component for navigation or action handling.
 *
 * @param {string} to - The navigation path for the button (used when `component` is a `Link`).
 * @param {Function} onClick - The click event handler for the button.
 * @param {React.ElementType} icon - The icon component to render inside the button.
 * @param {string} text - The text to display on the button.
 * @param {React.ElementType} component - The component to use for rendering the button (e.g., `Link` or `button`).
 * @param {string} className
 */

const CustomButton = ({
  to,
  onClick,
  icon: Icon,
  text,
  component = Link,
  marginLeft,
}) => {
  // Responsive Design
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Button
      variant="contained"
      to={to}
      component={component}
      sx={{
        color: "#efefef",
        backgroundColor: "#022c43",
        marginLeft: marginLeft ? marginLeft : "1rem",
        marginBottom: isSmallScreen ? "0.5rem" : "0rem",
      }}
      onClick={onClick}
    >
      {Icon && <Icon sx={{ marginRight: "5px" }} />}
      {text}
    </Button>
  );
};

// Prop validation using PropTypes
CustomButton.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.elementType,
  text: PropTypes.string.isRequired,
  component: PropTypes.elementType,
  marginLeft: PropTypes.string,
};

// Default Props
CustomButton.defaultProps = {
  to: null,
  onClick: null,
  icon: null,
  component: Link,
};

export default CustomButton;
