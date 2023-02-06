const connection = require('./connection');


class db {
    constructor (connection) {
        this.connection = connection
    }
    viewAllDepartments = () => {
        return this.connection.query('SELECT * FROM department');
    }

    viewAllRoles = () => {
        return this.connection.query('SELECT * FROM role');
    }


};


module.exports = new db(connection);