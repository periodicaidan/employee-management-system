const { rethrow } = require('./utils');

/*** GENERAL ***/

function truncate(conn, tableName) {
    conn.query(
        'truncate table ?',
        [tableName],
        (err, rows) => {
            rethrow(err);
            console.log(`Truncated table ${tableName}`);
        }
    )
}

/*** DEPARTMENTS ***/

function addDepartment(conn, name) {
    conn.query(
        'insert into `Departments` set ?',
        { name },
        (err, rows) => {
            rethrow(err);
            console.log(`Created ${rows.affectedRows} rows in Departments`);
        }
    )
}

function showAllDepartments(conn) {
    conn.query(
        'select * from `Departments`',
        (err, rows) => {
            rethrow(err);
            console.table(rows);
        }
    )
}

/*** ROLES ***/

function addRole(conn, title, salary, departmentId) {
    conn.query(
        'insert into `Roles` set ?',
        {
            title,
            salary,
            department_id: departmentId
        },
        (err, rows) => {
            rethrow(err);
            console.log(`Created ${rows.affectedRows} rows.`);
        }
    )
}

function showAllRoles(conn) {
    conn.query(
        'select * from `Roles`',
        (err, rows) => {
            rethrow(err);
            console.table(rows);
        }
    );
}

function showRolesForDepartment(conn, department) {
    conn.query(
        'select * from `Roles` where `department_id` = (select `id` from `Departments` where `name` = ?)',
        [department],
        (err, rows) => {
            rethrow(err);
            console.table(rows);
        }
    )
}

/*** EMPLOYEES ***/

function addEmployee(conn, firstName, lastName, role, managerId) {
    if (managerId) {
        conn.query(
            'insert into `Employees` set `first_name` = ?, `last_name` = ?, `role_id` = (select `id` from `Roles` where `title` = ?), `manager_id` = ?',
            [firstName, lastName, role, managerId],
            (err, rows) => {
                rethrow(err);
                console.log(`Created ${rows.affectedRows} rows in Employees`);
            }
        );
    } else {
        conn.query(
            'insert into `Employees` set `first_name` = ?, `last_name` = ?, `role_id` = (select `id` from `Roles` where `title` = ?)',
            [firstName, lastName, role],
            (err, rows) => {
                rethrow(err);
                console.log(`Created ${rows.affectedRows} rows in Employees`);
            }
        );
    }
}

function showAllEmployees(conn) {
    conn.query(
        'select * from `Employees`',
        (err, rows) => {
            rethrow(err);
            console.table(rows);
        }
    );
}

function showEmployeesWithRole(conn, role) {
    conn.query(
        'select * from `Employees` where `role_id` = (select `id` from `Roles` where `title` = ?)',
        [role],
        (err, rows) => {
            rethrow(err);
            console.table(rows);
        }
    );
}

function showEmployeesInDepartment(conn, department) {
    conn.query(
        'select * from `Employees` where `role_id` in (select `id` from `Roles` where `department_id` = (select `id` from `Departments` where `name` = ?))',
        [department],
        (err, rows) => {
            rethrow(err);
            console.table(rows);
        }
    )
}

module.exports = {
    truncate,
    addDepartment,
    showAllDepartments,
    addRole,
    showAllRoles,
    showRolesForDepartment,
    addEmployee,
    showAllEmployees,
    showEmployeesWithRole,
    showEmployeesInDepartment
};