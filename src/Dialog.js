import React from 'react';

const Dialog = ({ children, onClose }) => (
  <div className="dialog">
    {children}
    <button onClick={onClose}>Close</button>
  </div>
);

export default Dialog;
