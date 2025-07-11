// src/AddToHomeScreenPrompt.js
import React, { useEffect, useState } from "react";

function isIos() {
  return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
}

function isInStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
}

const AddToHomeScreenPrompt = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isIos() && !isInStandaloneMode()) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      width: "100%",
      backgroundColor: "#1976d2",
      color: "#fff",
      padding: "1rem",
      textAlign: "center",
      zIndex: 1000,
    }}>
      <p style={{ margin: 0 }}>
        🚀 Install this app on your iPhone: tap <strong>Share</strong> then <strong>Add to Home Screen</strong>.
      </p>
    </div>
  );
};

export default AddToHomeScreenPrompt;