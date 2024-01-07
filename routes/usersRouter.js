const { Router } = require('express');
const { usersController } = require('../controllers');

// api/users
const usersRouter = Router();

usersRouter
  .route('/')
  .get(usersController.getUsers)
  .post(usersController.createUser);

usersRouter
  .route('/:id')
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .delete(usersController.deleteUserById);

module.exports = usersRouter;
