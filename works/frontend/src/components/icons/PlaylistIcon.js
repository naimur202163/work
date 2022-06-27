import React from "react";

const PlaylistIcon = ({ fill, width = 20, height = 20 }) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <path d="M4 6h18v2H4z" fill={fill}></path>
      <path d="M4 12h18v2H4z" fill={fill}></path>
      <path d="M4 18h12v2H4z" fill={fill}></path>
      <path d="M21 18l7 5l-7 5V18z" fill={fill}></path>
    </svg>
  );
};

export default PlaylistIcon;
