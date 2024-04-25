import express from "express";
import jwtValidation from "../middlewares/AuthMiddleware.js";
import {
  getUserFolder,
  createFolder,
  deleteFolder,
} from "../controllers/FileExplorerController.js";

const FileExplorerRouter = express.Router();

FileExplorerRouter.get("/getUserFolder", jwtValidation, getUserFolder);

FileExplorerRouter.post("/createFolder", jwtValidation, createFolder);

FileExplorerRouter.delete("/deleteFolder", jwtValidation, deleteFolder);

export default FileExplorerRouter;
