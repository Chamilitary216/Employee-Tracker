DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

-- DEPARTMENT TABLE ----
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
 
);
-- DEPARTMENT TABLE ----
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);
-- EMPLOYEE ROLE TABLE ----
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)

);

-- DEPARTMENT SEEDS -----
INSERT INTO department (name)
VALUE ("Human Resources");
INSERT INTO department (name)
VALUE ("Customer Service");
INSERT INTO department (name)
VALUE ("Management");


-- EMPLOYEE ROLE SEEDS -------
INSERT INTO role (title, salary, department_id)
VALUE ("Fry Cook", 30000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Cashier", 25000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("General Manager", 65000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Server", 10000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Hostess", 30000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Owner", 150000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("HR", 80000, 1);

-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Spongebob", "Squarepants", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Sandy", "Cheeks", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Patrick","Star",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Squidward", "Tentacles", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Pearl", "Krabs", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Mermaid", "Man", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Barnacle", "Boy", 2, 7);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;