import React from 'react';
import './Folder.css';

const Folder = ({ name, onRemoveFolder }) => {

  const handleRemoveFolder = () => {
    onRemoveFolder(name);
  };

  return (
    <div className="folder">
      <div className="folder-header">
        <span className="folder-icon">📁</span>
        <span className="folder-name">{name}</span>
      </div>
      <div className="folder-actions">
        <button onClick={handleRemoveFolder}>删除</button>
      </div>
    </div>
  );
};

export default Folder;
