const mysql = require('mysql');
const { truncate } = require('./queries');
const queries = require('./queries');

const conn = mysql.createConnection({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'employee_manager_system'
});

queries.truncate(conn, 'Departments');
queries.addDepartment(conn, 'Management');
queries.showAllDepartments(conn);