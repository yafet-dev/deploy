const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");
const port = 3001;

const app = express();
app.use(
  cors({
    origin: ["https://deploy-mern-frontend.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.5fe73.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});
mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.status(201).json(users))
    .catch((err) => res.status(400).json(err));
});

app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;

  UserModel.findById({ _id: id })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;

  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    }
  )
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete(id)
    .then((ressult) => res.status(200).json(ressult))
    .catch((err) => res.status(400).json(err));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
