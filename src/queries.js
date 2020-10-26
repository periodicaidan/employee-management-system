const { rethrow, query } = require('./utils');
const mysql = require('mysql');

/*** GENERAL ***/

const conn = mysql.createConnection({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'employee_manager_system'
});

async function _getAllFrom(tableName) {
    return await query(
        conn,
        'select * from ??',
        [tableName]
    );
}

/*** DEPARTMENTS ***/

async function addDepartment(name) {
    return await query(
        conn,
        'insert into `Departments` set ?',
        { name }
    );
}

async function getAllDepartments() {
    return await _getAllFrom('Departments');
}

/*** ROLES ***/

async function addRole(title, salary, departmentId) {
    return await query(
        conn,
        'insert into `Roles` set ?',
        {
            title,
            salary,
            department_id: departmentId
        }
    );
}

async function getAllRoles() {
    return await _getAllFrom('Roles');
}

async function getRolesForDepartment(department) {
    return await query(
        conn,
        'select * from `Roles` where `department_id` = (select `id` from `Departments` where `name` = ?)',
        [department]
    );
}

/*** EMPLOYEES ***/

async function addEmployee(firstName, lastName, role, managerId) {
    if (managerId) {
        return await query(
            conn,
            'insert into `Employees` set `first_name` = ?, `last_name` = ?, `role_id` = (select `id` from `Roles` where `title` = ?), `manager_id` = ?',
            [firstName, lastName, role, managerId]
        );
    }

    return await query(
        conn,
        'insert into `Employees` set `first_name` = ?, `last_name` = ?, `role_id` = (select `id` from `Roles` where `title` = ?)',
        [firstName, lastName, role]
    );
}

async function getAllEmployees() {
    return await _getAllFrom('Employees');
}

async function getEmployeesWithRole(role) {
    return await query(
        conn,
        'select * from `Employees` where `role_id` = (select `id` from `Roles` where `title` = ?)',
        [role]
    );
}

async function getEmployeesInDepartment(department) {
    return await query(
        conn,
        'select * from `Employees` where `role_id` in (select `id` from `Roles` where `department_id` = (select `id` from `Departments` where `name` = ?))',
        [department]
    )
}

module.exports = {
    addDepartment,
    getAllDepartments,
    addRole,
    getAllRoles,
    getRolesForDepartment,
    addEmployee,
    getAllEmployees,
    getEmployeesWithRole,
    getEmployeesInDepartment
};