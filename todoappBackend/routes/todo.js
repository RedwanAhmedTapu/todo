const express = require("express");
const Todo = require("../models/Todo.Model");
const router = express.Router();

// Create a todo
router.post("/todos", async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get  todos
router.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//  filtering toDos
router.get("/todos", async (req, res) => {
    try {
      const filter = req.query.filter;
      const query = filter === "Completed" ? { completed: true } : filter === "Pending" ? { completed: false } : {};
      const todos = await Todo.find(query);
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Update a todo
router.put("/todos/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a todo
router.delete("/todos/:id", async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;