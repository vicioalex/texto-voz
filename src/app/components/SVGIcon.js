// SVGIcon.js
import React from 'react'

const SVGIcon = ({ svgCode, width, height, fill, viewBox, style, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox={viewBox}
      style={style}
      {...rest}
    >
      {svgCode}
    </svg>
  )
}

export default SVGIcon
