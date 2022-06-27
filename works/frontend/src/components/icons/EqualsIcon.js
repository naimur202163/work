import React from "react";

const EditIcon = ({ className, fill, width = 20, height = 20 }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill={fill}
      id="Flat"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
    >
      <path d="M222,160a6.00029,6.00029,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6.00029,6.00029,0,0,1,222,160ZM40,102H216a6,6,0,0,0,0-12H40a6,6,0,0,0,0,12Z" />
    </svg>
  );
};

export default EditIcon;
