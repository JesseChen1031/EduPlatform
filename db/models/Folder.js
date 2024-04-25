import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
});

const Folder = mongoose.model("Folder", folderSchema);

export default Folder;
