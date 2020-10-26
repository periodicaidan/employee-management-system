function rethrow(err) {
    if (err)
        throw err;
}

function query(conn, stmt, params) {
    return new Promise((res, rej) => {
        conn.query(
            stmt,
            params,
            (err, rows) => {
                if (err) 
                    return rej(err);
                res(rows);
            }
        );
    });
}

module.exports = {
    rethrow,
    query,
};