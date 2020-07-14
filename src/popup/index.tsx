// To render virtual DOM in Extension default_popup page.
// Main file to render all the DOM elements.

import React from "react";
import ReactDOM from "react-dom";
import Popup from "./Popup";

// Render virtual DOM to real DOM of Extension.
chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
  ReactDOM.render(<Popup />, document.getElementById("popup"));
});
