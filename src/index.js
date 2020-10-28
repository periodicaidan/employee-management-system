const mysql = require('mysql');
const queries = require('./queries');

async function seed() {
    await queries.addDepartment('Sales');
    await queries.addDepartment('Accounting');

    await queries.addRole('Jr. Salesman', 60000.0, 1);
    await queries.addRole('Sr. Salesman', 80000.0, 1);
    await queries.addRole('Sales Manager', 100000.0, 1);

    await queries.addRole('Jr. Accountant', 50000.0, 2);
    await queries.addRole('Sr. Accountant', 75000.0, 2);

    await queries.addEmployee('Jackson', 'Ronalds', 'Sales Manager');
    await queries.addEmployee('Donna', 'Ford', 'Jr. Salesman', 1);
    await queries.addEmployee('Andrew', 'Donovan', 'Sr. Salesman');
    await queries.addEmployee('Soña', 'Della Rosa', 'Sr. Salesman');
    await queries.addEmployee('Alan', 'Pan', 'Jr. Accountant');
}

queries.getAllDepartments()
    .then(console.table);

queries.getRolesForDepartment('Accounting')
    .then(console.table);

queries.getAllEmployeesVerbose()
    .then(console.table);
