const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory "database" of todos
let todos = [
  { id: 1, task: "Learn Express routing", completed: false },
  { id: 2, task: "Build CRUD API", completed: true },
];
let nextId = 3;

// Helper: find a todo by id, or undefined if not found
function findTodo(id) {
  return todos.find((t) => t.id === Number(id));
}

// --- GET /todos - list all todos ---
app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

// --- GET /todos/active - bonus: only todos that are NOT completed ---
// Defined BEFORE /todos/:id so "active" isn't mistaken for an id.
app.get("/todos/active", (req, res) => {
  const active = todos.filter((t) => !t.completed);
  res.status(200).json(active);
});

// --- GET /todos/:id - single read ---
app.get("/todos/:id", (req, res) => {
  const todo = findTodo(req.params.id);
  if (!todo) {
    return res.status(404).json({ error: `Todo with id ${req.params.id} not found` });
  }
  res.status(200).json(todo);
});

// --- POST /todos - create, with validation ---
app.post("/todos", (req, res) => {
  const { task, completed } = req.body;

  if (!task || typeof task !== "string" || task.trim() === "") {
    return res.status(400).json({ error: '"task" field is required and must be a non-empty string' });
  }

  const newTodo = {
    id: nextId++,
    task: task.trim(),
    completed: typeof completed === "boolean" ? completed : false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// --- PUT /todos/:id - update ---
app.put("/todos/:id", (req, res) => {
  const todo = findTodo(req.params.id);
  if (!todo) {
    return res.status(404).json({ error: `Todo with id ${req.params.id} not found` });
  }

  const { task, completed } = req.body;

  if (task !== undefined) {
    if (typeof task !== "string" || task.trim() === "") {
      return res.status(400).json({ error: '"task" must be a non-empty string' });
    }
    todo.task = task.trim();
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({ error: '"completed" must be a boolean' });
    }
    todo.completed = completed;
  }

  res.status(200).json(todo);
});

// --- DELETE /todos/:id ---
app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: `Todo with id ${req.params.id} not found` });
  }
  const [deleted] = todos.splice(index, 1);
  res.status(200).json({ message: "Todo deleted", todo: deleted });
});

app.listen(PORT, () => {
  console.log(`Todo API running on http://localhost:${PORT}`);
});
