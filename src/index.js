const mysql = require('mysql');
const { truncate } = require('./queries');
const queries = require('./queries');

const conn = mysql.createConnection({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'employee_manager_system'
});

function seed(conn) {
    queries.addDepartment(conn, 'Sales');
    queries.addDepartment(conn, 'Accounting');

    queries.addRole(conn, 'Jr. Salesman', 60000.0, 1);
    queries.addRole(conn, 'Sr. Salesman', 80000.0, 1);
    queries.addRole(conn, 'Sales Manager', 100000.0, 1);

    queries.addRole(conn, 'Jr. Accountant', 50000.0, 2);
    queries.addRole(conn, 'Sr. Accountant', 75000.0, 2);
}

// seed(conn);

queries.showRolesForDepartment(conn, 'Sales');