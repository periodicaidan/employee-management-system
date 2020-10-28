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

async function getAllRolesVerbose() {
    return await query(
        conn,
        'select `R`.`id`, `R`.`title`, `R`.`salary`, `D`.`name` as `department`' +
        'from `Roles` as `R`' +
        'inner join `Departments` as `D` on `R`.`department_id` = `D`.`id`' +
        'order by `R`.`id`'
    );
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

async function getAllEmployeesVerbose() {
    return await query(
        conn,
        // blegh
        'select `E`.`id`, `E`.`first_name`, `E`.`last_name`, `R`.`title`, `D`.`name` as `department`, `R`.`salary`, concat(`Mng`.`first_name`, " ", `Mng`.`last_name`) as `manager`' +
        'from `Employees` as `E`' +
        'inner join `Roles` as `R` on `E`.`role_id` = `R`.`id`' +
        'inner join `Departments` as `D` on `R`.`department_id` = `D`.`id`' +
        'left join `Employees` as `Mng` on `E`.`manager_id` = `Mng`.`id`' + 
        'order by `E`.`id`'
    );
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
    );
}

async function updateEmployeeRole(employeeId, newRoleId) {
    return await query(
        conn,
        'update `Employees` set `role_id` = ? where `id` = ?',
        [employeeId, newRoleId]
    );
}

module.exports = {
    addDepartment,
    getAllDepartments,
    addRole,
    getAllRoles,
    getAllRolesVerbose,
    getRolesForDepartment,
    addEmployee,
    getAllEmployees,
    getAllEmployeesVerbose,
    getEmployeesWithRole,
    getEmployeesInDepartment
};