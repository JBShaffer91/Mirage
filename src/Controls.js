import React from 'react';

class Controls extends React.Component {
  render() {
    return (
      <div className="controls">
        <button onClick={() => this.props.onMove('up')}>Up</button>
        <button onClick={() => this.props.onMove('down')}>Down</button>
        <button onClick={() => this.props.onMove('left')}>Left</button>
        <button onClick={() => this.props.onMove('right')}>Right</button>
      </div>
    );
  }
}

export default Controls;
