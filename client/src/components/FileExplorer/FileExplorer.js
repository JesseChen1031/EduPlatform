import React, { useState } from 'react';
import './FileExplorer.css';
import Folder from '../Folder/Folder'

const FileExplorer = () => {
    const [folders, setFolders] = useState([]);

    const handleCreateFolder = () => {
        const newFolderName = prompt('Enter folder name:');
        if (newFolderName){
            setFolders((prevFolders)=> [...prevFolders, newFolderName])
        }
    }

    const handleDeleteFolder = (deleteFolderName) => {
        
        if (deleteFolderName){
            const updatedFolders = folders.filter((folder) => folder !== deleteFolderName);
            setFolders(updatedFolders)
        }
    }

    return (
        <div className="file-explorer">
        <div className="file-explorer-header">
            <h2>文件资源管理器r</h2>
        </div>
        <div className="file-explorer-controls">
            <button onClick={handleCreateFolder}>新建文件夹</button>
        </div>
        <div className="folder-container">
            {folders.map((folder, index) => (
            <Folder
                key={index}
                name={folder}
                onRemoveFolder={handleDeleteFolder}
            />
            ))}
        </div>
       
        </div>
    );
};

export default FileExplorer;