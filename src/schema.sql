drop database if exists employee_manager_system;
create database employee_manager_system;

use employee_manager_system;

create table Departments (
    id int auto_increment primary key,
    `name` varchar(30) not null
);

create table Roles (
    id int auto_increment primary key,
    title varchar(30) not null,
    salary decimal(19,4) not null,
    department_id int not null,

    foreign key (department_id)
        references Departments(id)
        on delete cascade
);

create table Employees (
    id int auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30),
    role_id int not null,
    manager_id int,

    foreign key (role_id)
        references Roles(id),
    
    foreign key (manager_id)
        references Employees(id)
);

