// SVGIcon.js
import React from 'react';

const SVGIcon = ({ svgCode, width, height, fill, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 24 24"
      {...rest}
    >
      {svgCode}
    </svg>
  );
};

export default SVGIcon;
