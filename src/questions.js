const inquirer = require('inquirer');
const queries = require('./queries');

const actionOptions = [
    'View All Employees',
    'View All Employees by Department',
    'View All Employees by Manager',
    'Add Employee',
    'Remove Employee',
    'View All Roles',
    'View All Roles by Department',
    'Add Role',
    'View All Departments',
    'Add Department',
    'Exit',
];

async function replIndex() {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: actionOptions
    });

    switch (action) {
        case 'View All Employees':
            await queries.getAllEmployeesVerbose()
                .then(console.table);
            break;
        
        case 'Exit':
            return false;
        
        default:
            console.warn(`Action "${action}" not implemented (yet). Sorry!`);
    }

    return true;
}

module.exports = {
    replIndex,
};