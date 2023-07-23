import React from 'react';

const Map = ({ layout, playerPosition }) => {
  const cameraSize = 5; // The number of tiles to show around the player
  const cameraStartY = Math.max(0, playerPosition.y - cameraSize);
  const cameraEndY = Math.min(layout.length, playerPosition.y + cameraSize + 1);
  const cameraStartX = Math.max(0, playerPosition.x - cameraSize);
  const cameraEndX = Math.min(layout[0].length, playerPosition.x + cameraSize + 1);

  return (
    <div className="map">
      {layout.slice(cameraStartY, cameraEndY).map((row, y) => (
        <div key={y} className="row">
          {row.slice(cameraStartX, cameraEndX).map((tile, x) => (
            <div key={x} className={`tile tile-${tile}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Map;
