const mysql = require('mysql');
const queries = require('./queries');
const { replIndex } = require('./questions');

async function main(argv) {
    while(await replIndex());
    process.exit(0);
}

main();