const Task = require("../models/Task");
const { DEFAULT_TASK_STATUS } = require("../config/constants");

module.exports = {
  // Получить список всех задач
  getAllTasks(req, res) {
    res.json(Task.getAll());
  },

  // Получить задачу по ID
  getTaskById(req, res) {
    const task = Task.getById(Number(req.params.id));

    if (!task) {
      return res.status(404).json({ error: "Задача не найдена" });
    }

    res.json(task);
  },

  getTasksByUserId(req, res) {
    const userId = Number(req.query.userId);
    const tasks = Task.getAll().filter((task) => task.authorId === userId);

    if (tasks.length === 0) {
      return res.status(404).json({ error: "Задачи не найдены для данного пользователя" });
    }

    res.json(tasks);
  },

  // Создать новую задачу
  createTask(req, res) {
    const newTask = Task.create({
      title: req.body.title,
      authorId : req.body.authorId,
      completed: req.body.completed || DEFAULT_TASK_STATUS,
    });

    res.status(201).json(newTask);
  },

  // Обновить существующую задачу
  updateTask(req, res) {
    const updatedTask = Task.update(Number(req.params.id), req.body);

    if (!updatedTask) {
      return res.status(404).json({ error: "Задача не найдена" });
    }

    res.json(updatedTask);
  },

  // Удалить задачу
  deleteTask(req, res) {
    const isDeleted = Task.delete(Number(req.params.id));

    if (!isDeleted) {
      return res.status(404).json({ error: "Задача не найдена" });
    }

    res.status(204).send();
  },
};
