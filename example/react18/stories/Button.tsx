import React from "react";
import "./button.css";

export const Button = () => (
  <button
    className="storybook-button"
    onClick={() => alert(window.navigator.userAgent)}
  >
    alert window.navigator.userAgent
  </button>
);
