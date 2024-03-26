const express = require('express');
const { read } = require('fs');
const routes = express.Router();

const employeesController = require("../../controllers/employeesController");

routes.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createEmployees)
    .put(employeesController.updateEmployees)
    .delete(employeesController.deleteEmployees);

routes.route('/:id')
    .get(employeesController.getEmployees);

module.exports = routes;