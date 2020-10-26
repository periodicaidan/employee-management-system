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

module.exports = {
    truncate,
    addDepartment,
    showAllDepartments
}