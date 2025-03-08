const User = require("../models/User");

module.exports = {
  getAllUsers(req, res) {
    res.json(User.getAll());
  },

  getUserById(req, res) {
    const user = User.getById(Number(req.params.id));

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    
    res.json(user);
  },

  createUser(req, res) {
    try {
      const newUser = User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateUser(req, res) {
    const updatedUser = User.update(Number(req.params.id), req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.json(updatedUser);
  },

  deleteUser(req, res) {
    const isDeleted = User.delete(Number(req.params.id));
    if (!isDeleted) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.status(204).send();
  },
};