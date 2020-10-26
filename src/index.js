const mysql = require('mysql');

const conn = mysql.createConnection({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'employee_manager_system'
});

function showTables(conn) {
    conn.query('show tables', (err, rows) => {
        if (err)
            throw err;

        console.table(rows);
    });
}

showTables(conn);