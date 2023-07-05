import Button from "@mui/material/Button";
import React from "react";

function LinkedInButton() {
  const buttonStyle = {
    backgroundColor: "#0077B5",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#005E9E",
    },
  };

  const handleLinkedInSignIn = () => {
    // Logic for handling LinkedIn sign-in
    // Add your implementation here
  };

  return (
    <Button
      style={buttonStyle}
      onClick={handleLinkedInSignIn}
      variant="contained"
    >
      Sign in with LinkedIn
    </Button>
  );
}

export default LinkedInButton;
