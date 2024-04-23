import express from "express";
import { register, login, logout } from "../controllers/UserController.js";

const UserRouter = express.Router();

UserRouter.post("/login", login);

UserRouter.post("/register", register);

UserRouter.post("/logout", logout);

export default UserRouter;
