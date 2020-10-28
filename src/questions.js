const inquirer = require('inquirer');
const queries = require('./queries');

const actionOptions = [
    'View All Employees',
    // 'View All Employees by Department',
    // 'View All Employees by Manager',
    'Add Employee',
    'Update Employee Role',
    // 'Remove Employee',
    'View All Roles',
    // 'View All Roles by Department',
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

    // TODO: Replace console.table with something...less half-assed
    switch (action) {
        case 'View All Employees':
            await queries.getAllEmployeesVerbose()
                .then(console.table);
            break;

        case 'Add Employee':
            await promptAddEmployee();
            break;
        
        case 'Update Employee Role':
            const employees = await queries.getAllEmployees();
            const roles = await queries.getAllRoles();

            const { chosenEmployee, newRole } = inquirer.prompt([
                {
                    type: 'list',
                    name: 'chosenEmployee',
                    message: 'Whose role do you want to change?',
                    choices: employees.map(em => `${em.first_name} ${em.last_name}`),
                    filter: answer => employees.find(em => `${em.first_name} ${em.last_name}` === answer),
                },
                {
                    type: 'list',
                    name: 'newRole',
                    message: 'New role:',
                    choices: roles.map(role => role.title),
                    filter: answer => roles.find(role => role.title === answer)
                }
            ]);

            console.log(chosenEmployee, newRole);
            
            break;
        
        case 'View All Roles':
            await queries.getAllRolesVerbose()
                .then(console.table);
            break;

        case 'Add Role':
            const departments = await queries.getAllDepartments();

            const { title, salary, selectedDepartment } = await inquirer.prompt([
                {
                    name: 'title',
                    message: 'Name of the role:'
                },
                {
                    name: 'salary',
                    message: 'Salary for this role:',
                    filter: answer => parseFloat(answer),
                },
                {
                    type: 'list',
                    name: 'selectedDepartment',
                    choices: departments.map(dept => dept.name),
                    message: 'Department for role:',
                    filter: answer => departments.find(dept => dept.name === answer),
                }
            ]);

            await queries.addRole(title, salary, selectedDepartment.id)
                .then(() => console.log(`Added a new role: ${title}`));

            break;
        
        case 'View All Departments':
            await queries.getAllDepartments()
                .then(console.table);
            break;
        
        case 'Add Department':
            const { departmentName } = await inquirer.prompt({
                name: 'departmentName',
                message: 'Name for new department:'
            });

            await queries.addDepartment(departmentName)
                .then(() => console.log(`New department added: ${departmentName}`));
            
            break;
        
        case 'Exit':
            return false;
        
        default:
            console.warn(`Action "${action}" not implemented (yet). Sorry!`);
    }

    return true;
}

async function promptAddEmployee() {
    const employees = await queries.getAllEmployees();
    const roles = await queries.getAllRoles();

    const { firstName, lastName, employeeRole, employeeManager, } = await inquirer.prompt([
        {
            name: 'firstName',
            message: 'Employee\'s first name:',
        },
        {
            name: 'lastName',
            message: 'Last name:'
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: 'Role:',
            choices: roles.map(role => role.title),
            filter: answer => roles.find(role => role.title === answer)
        },
        {
            type: 'list',
            name: 'employeeManager',
            message: 'Manager:',
            choices: [...employees.map(em => `${em.first_name} ${em.last_name}`), 'None'],
            filter: answer => employees.find(em => `${em.first_name} ${em.last_name}` === answer)
        }
    ]);

    await queries.addEmployee(firstName, lastName, employeeRole.id, employeeManager ? employeeManager.id : null)
        .then(() => console.log(`New employee added: ${firstName} ${lastName}`));
}

module.exports = {
    replIndex,
};