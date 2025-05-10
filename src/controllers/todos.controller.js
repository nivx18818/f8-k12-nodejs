const { readDb, writeDb } = require("@/utils/db");

const RESOURCE = "todos";
const readResource = readDb(RESOURCE, []);
const writeResource = writeDb(RESOURCE);

exports.index = async (req, res) => {
  const todos = await readResource();
  res.status(200).json({
    status: "success",
    data: todos,
  });
};

exports.show = async (req, res) => {
  const todos = await readResource();
  const todo = todos.find((prod) => prod.id === Number(req.params.id));

  if (!todo) {
    return res.status(404).json({
      status: "error",
      message: "Todo not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: todo,
  });
};

exports.store = async (req, res) => {
  const todos = await readResource();
  const newId = (todos.at(-1)?.id ?? 0) + 1;

  const newTodo = {
    id: newId,
    title: req.body.title,
    body: req.body.body,
  };

  const newTodos = [...todos, newTodo];
  await writeResource(newTodos);

  res.status(201).json({
    status: "success",
    data: newTodo,
  });
};

exports.update = async (req, res) => {
  const todos = await readResource();
  const todoIndex = todos.findIndex(
    (prod) => prod.id === Number(req.params.id)
  );

  if (todoIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Todo not found",
    });
  }

  const updatedTodo = { ...todos[todoIndex], ...req.body };

  const updatedTodos = [
    ...todos.slice(0, todoIndex),
    updatedTodo,
    ...todos.slice(todoIndex + 1),
  ];

  await writeResource(updatedTodos);

  res.status(200).json({
    status: "success",
    data: updatedTodo,
  });
};

exports.destroy = async (req, res) => {
  const todos = await readResource();
  const todoId = Number(req.params.id);
  const updatedTodos = todos.filter((prod) => prod.id !== todoId);

  if (updatedTodos.length === todos.length) {
    return res.status(404).json({
      status: "error",
      message: "Todo not found",
    });
  }

  await writeResource(updatedTodos);

  res.status(204).send();
};
