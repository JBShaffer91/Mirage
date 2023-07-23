import React from 'react';
import Player from './Player';
import Map from './Map';
import Controls from './Controls';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerPosition: { x: 2, y: 2 },
      mapLayout: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      // Add other state variables as needed
    };

    this.handleMove = this.handleMove.bind(this);
  }

  handleMove(direction) {
    const dx = direction === 'right' ? 1 : direction === 'left' ? -1 : 0;
    const dy = direction === 'down' ? 1 : direction === 'up' ? -1 : 0;
    const x = this.state.playerPosition.x + dx;
    const y = this.state.playerPosition.y + dy;

    if (
      y >= 0 && y < this.state.mapLayout.length &&
      x >= 0 && x < this.state.mapLayout[0].length &&
      this.state.mapLayout[y][x] === 0
    ) {
      this.setState({ playerPosition: { x, y } });
    }
  }

  render() {
    return (
      <div>
        <Player position={this.state.playerPosition} />
        <Map layout={this.state.mapLayout} playerPosition={this.state.playerPosition} />
        <Controls onMove={this.handleMove} />
      </div>
    );
  }
}

export default Game;
