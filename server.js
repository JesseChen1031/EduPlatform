import express from "express";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";

//Routers
import UserRouter from "./routes/UserRouter.js";
import FileExplorerRouter from "./routes/FileExplorerRouter.js";

dotenv.config(".");
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5050;
const mongoURI = process.env.MONGODB_CONNECTION_STRING;
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI, {});

// Event listeners for connection success and error
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

//API Routers
app.use("/api/user", UserRouter);
app.use("/api/fileExplorer", FileExplorerRouter);

app.set("port", PORT);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  console.log(req);
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
