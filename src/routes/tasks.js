const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasks');
const validator = require('../middleware/validator');

// Маршруты для работы с задачами
router.get('/', (req, res) => {
    if (req.query.userId) {
      return controller.getTasksByUserId(req, res);
    }
    return controller.getAllTasks(req, res);
  });  
router.get('/:id', controller.getTaskById);    // GET /tasks/:id
router.post('/', validator, controller.createTask);    // POST /tasks
router.put('/:id', validator, controller.updateTask);  // PUT /tasks/:id
router.delete('/:id', controller.deleteTask);  // DELETE /tasks/:id

module.exports = router;