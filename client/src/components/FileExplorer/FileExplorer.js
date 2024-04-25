import React, { useState, useEffect } from "react";
import "./FileExplorer.css";
import FolderItem from "../FolderItem/FolderItem";
import axiosInstance from "../../utils/axiosInstance.js";

const FileExplorer = () => {
  const [folders, setFolders] = useState([]);

  const loadFolders = async () => {
    const response = await axiosInstance.get("/api/fileExplorer/getUserFolder");
    console.log(response);
    if (response.data.folders) {
      setFolders([...response.data.folders]);
    }
  };

  useEffect(() => {
    loadFolders();
  }, []);

  const handleCreateFolder = async () => {
    const newFolderName = prompt("Enter folder name:");
    if (newFolderName) {
      try {
        const response = await axiosInstance.post(
          "/api/fileExplorer/createFolder",
          {
            folderName: newFolderName,
          }
        );
        console.log(response.data.message);
        loadFolders();
        alert("Creating folder successful");
      } catch (error) {
        alert("Creating folder failed");
        console.error("Error creating folder:", error);
      }
    }
  };

  const handleDeleteFolder = async (folderId) => {
    if (folderId) {
      try {
        const response = await axiosInstance.delete(
          "/api/fileExplorer/deleteFolder",
          {
            params: {
              folderId: folderId,
            },
          }
        );

        loadFolders();

        alert("Deleting folder successful");
      } catch (error) {
        alert("Deleting folder failed");
        console.error("Error deleting folder:", error);
      }
    }
  };

  return (
    <div className="file-explorer">
      <div className="file-explorer-header">
        <h2>文件资源管理器</h2>
      </div>
      <div className="file-explorer-controls">
        <button onClick={handleCreateFolder}>新建文件夹</button>
      </div>
      <div className="folder-container">
        {folders.map((folder) => (
          <FolderItem
            key={folder._id}
            folderId={folder._id}
            name={folder.name}
            onRemoveFolder={handleDeleteFolder}
          />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
