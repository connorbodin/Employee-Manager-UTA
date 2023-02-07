const connection = require('./connection');


class db {
    constructor (connection) {
        this.connection = connection
    }
    viewAllDepartments = () => {
        return this.connection.query('SELECT * FROM department');
    }

    viewAllRoles = () => {
        return this.connection.query(`SELECT role.id, role.title, department.name AS department
        FROM role
        INNER JOIN department ON role.department_id = department.id`);
    }

    viewAllEmployees = () => {
        return this.connection.query(`SELECT employee.id, 
        employee.first_name, 
        employee.last_name, 
        role.title, 
        department.name AS department,
        role.salary, 
        CONCAT (manager.first_name, " ", manager.last_name) AS manager
 FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id`);
    }

};


module.exports = new db(connection);