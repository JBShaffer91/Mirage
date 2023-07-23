import React from 'react';

const Player = ({ position }) => {
  return (
    <div className="player" style={{top: `${position.y * 32}px`, left: `${position.x * 32}px`}}>
      {/* Player character goes here */}
    </div>
  );
}

export default Player;
