const mysql = require('mysql');

class Table {
    /**
     * @param {mysql.Connection} conn 
     * @param {string} tableName 
     */
    constructor(conn, tableName) {
        this._conn = conn;
        this._tableName = tableName;
    }

    get tableName() {
        return this._tableName;
    }

    static query(stmt, params) {
        return new Promise((res, rej) => {
            this._conn(
                stmt, params,
                (err, rows) => {
                    if (err) 
                        return rej(err);
                    
                    res(rows);
                }
            );
        });
    }

    async insert(fields) {
        return await this.query('insert into ? set ?', fields);
    }

    async all() {
        return await this.query('select * from ?', [this.tableName]);
    }

    async where(constraints) {
        return await this.query('select * from ? where ?', [this.tableName, ...constraints]);
    }
}

module.exports = {
    Table,
}