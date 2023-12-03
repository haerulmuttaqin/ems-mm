import React from 'react'

const Bar: React.FC<{ animationDuration: number; progress: number }> = ({
  animationDuration,
  progress,
}) => (
  <div
    style={{
      background: "#89a3fa",
      height: 2.5,
      left: 0,
      marginLeft: `${(-1 + progress) * 100}%`,
      position: 'absolute',
      transition: `margin-left ${animationDuration}ms linear`,
      width: '100%',
    }}
  >
    <div
      style={{
        // boxShadow: '0 0 10px #29d, 0 0 5px #29d',
        display: 'block',
        height: '100%',
        opacity: 1,
        position: 'absolute',
        right: 0,
        transform: 'rotate(3deg) translate(0px, -4px)',
        width: 100,
      }}
    />
  </div>
)

export default Bar