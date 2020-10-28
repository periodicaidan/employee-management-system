use employee_manager_system;

insert into `Departments` (`name`) 
values 
    ("Sales"),          -- 1
    ("Engineering"),    -- 2
    ("Finance"),        -- 3
    ("Legal")           -- 4
;

insert into `Roles` (`title`, `salary`, `department_id`)
values
    ("Sales Lead", 100000, 1),          -- 1
    ("Salesperson", 80000, 1),          -- 2
    ("Lead Engineer", 150000, 2),       -- 3
    ("Software Engineer", 120000, 2),   -- 4
    ("Accountant", 125000, 3),          -- 5
    ("Legal Team Lead", 250000, 4),     -- 6
    ("Lawyer", 190000, 4)               -- 7
;

insert into `Employees` (`first_name`, `last_name`, `role_id`, `manager_id`)
values 
    ("John", "Doe", 1, null),           -- 1
    ("Mike", "Chan", 2, null),          -- 2
    ("Ashley", "Rodriguez", 3, null),   -- 3
    ("Kevin", "Tupik", 4, 3),           -- 4
    ("Malia", "Brown", 5, null),        -- 5
    ("Sarah", "Lourd", 6, null),        -- 6
    ("Tom", "Allen", 7, 6),             -- 7
    ("Christian", "Eckenrode", 3, 2)    -- 8
;

-- Because you can't have forward FK refs
update `Employees`
set `manager_id` = 3
where `id` = 1;

update `Employees`
set `manager_id` = 1
where `id` = 2;