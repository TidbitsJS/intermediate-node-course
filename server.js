const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 8000;
const app = express();

const User = require("./models/User");
mongoose
  .connect("mongodb://172.17.0.2:27017/userData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully Connected to MongoDB"))
  .catch((err) => {
    throw new Error("Oops an Error", err);
  });

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});

function sendResponse(res, err, data) {
  if (err) {
    res.json({
      success: false,
      message: err,
    });
  } else if (!data) {
    res.json({
      success: false,
      message: "Not Found",
    });
  } else {
    res.json({
      success: true,
      data: data,
    });
  }
}

// CREATE
app.post("/users", (req, res) => {
  // User.create() - to make a new document
  User.create({ ...req.body.newData }, (err, data) => {
    sendResponse(res, err, data);
  });
});

app.get("/users", (req, res) => {
  User.find((err, data) => sendResponse(res, err, data));
});

app
  .route("/users/:id")
  // READ
  .get((req, res) => {
    // User.findById()
    User.findById(req.params.id, (err, data) => {
      sendResponse(res, err, data);
    });
  })

  // UPDATE
  .put((req, res) => {
    // User.findByIdAndUpdate()
    User.findByIdAndUpdate(
      req.params.id,
      { ...req.body.newData },
      { new: true },
      (err, data) => {
        sendResponse(res, err, data);
      }
    );
  })

  // DELETE
  .delete((req, res) => {
    // User.findByIdAndDelete()
    User.findByIdAndDelete(req.params.id, (err, data) => {
      sendResponse(res, err, data);
    });
  });
