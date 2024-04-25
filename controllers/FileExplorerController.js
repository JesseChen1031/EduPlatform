import Folder from "../db/models/Folder.js";
import User from "../db/models/User.js";

const getUserFolder = async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findById(userId);
    const userFolders = await Folder.find({ owner: user });
    res.status(201).json({ folders: [...userFolders] });
  } catch (error) {
    console.error("Error getting folders", error.message);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

const createFolder = async (req, res) => {
  const userId = req.body.userId;
  const folderName = req.body.folderName;

  try {
    const user = await User.findById(userId);
    const newFolder = new Folder({
      name: folderName,
      owner: user,
      files: [],
    });
    await newFolder.save();

    return res
      .status(200)
      .json({ message: `Create folder:${folderName} successful` });
  } catch (error) {
    console.error("Error creating folder:", error.message);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

const deleteFolder = async (req, res) => {
  console.log(req);
  try {
    const folderId = req.params.folderId;
    await Folder.findOneAndDelete(folderId);

    return res
      .status(200)
      .json({ message: `Delete folder:${folderId} successful` });
  } catch (error) {
    console.error("Error deleting folder", error.message);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export { getUserFolder, createFolder, deleteFolder };
