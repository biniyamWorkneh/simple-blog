const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const TodoModel = require("./model/todo");
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/blog");

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});
app.patch("/update/:id", (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  TodoModel.findByIdAndUpdate(id, { task }, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(updatedTodo);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
});
app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.listen(5000, () => console.log("server is started successfully"));
