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

// CREATE
app.post("/users", (req, res) => {
  // User.create() - to make a new document
  User.create(
    {
      name: req.body.newData.name,
      email: req.body.newData.email,
      password: req.body.newData.password,
    },
    (err, data) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (!data) {
        res.json({ success: false, message: "Not Found" });
      } else {
        res.json({ success: true, data: data });
      }
    }
  );
});

app
  .route("/users/:id")
  // READ
  .get((req, res) => {
    // User.findById()
    User.findById(req.params.id, (err, data) => {
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
    });
  })

  // UPDATE
  .put((req, res) => {
    // User.findByIdAndUpdate()
  })
  // DELETE
  .delete((req, res) => {
    // User.findByIdAndDelete()
  });
