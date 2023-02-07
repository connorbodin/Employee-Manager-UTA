USE employees_db

INSERT INTO department (name)
VALUES ("Sales"),
("Finance"),
("Engineering"),
("Legal");



INSERT INTO role (title, salary, department_id)
VALUES 
("Sales Lead", "100000", 1),
("Salesperson", "80000", 1),
("Lead Engineer", "150000", 3),
("Software Engineer", "120000", 3),
("Account Manager", "160000", 2),
("Accountant", "125000", 2),
("Legal Team Lead", "250000", 4),
("Lawyer", "190000", 4);

INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
        VALUES
         ('Connor', 'Bodin', 1, NULL),
         ('Arnold ', 'S', 2, 1),
         ('Darren', 'M', 3, 1),
         ('Sean', 'Allen', 4, 3),
         ('Wiley', 'Vincent', 5, 1),
         ('Doby', 'Beesly', 6, 5);
         
-- int unsigned 