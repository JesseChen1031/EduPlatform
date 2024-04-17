import express from "express";
import cors from "cors";
import records from "./routes/dbRecords.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);



app.set('port', PORT);

app.use(express.static('./client/build'));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build",     
  "index.html"));
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

