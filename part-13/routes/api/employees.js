const express = require('express');
const { read } = require('fs');
const routes = express.Router();

const employeesController = require("../../controllers/employeesController");
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

routes.route('/')
    .get(employeesController.getAllEmployees)
    .post( verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createEmployees)
    .put( verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployees)
    .delete( verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.deleteEmployees);

routes.route('/:id')
    .get(employeesController.getEmployees);

module.exports = routes;