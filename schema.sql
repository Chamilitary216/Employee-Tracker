DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

--TABLE
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY,
  name VARCHAR(30),
);

-- Department Table --

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30),
 
);

-- Role Table --

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR (30),
  department_id INT
  salary DECIMAL,
  PRIMARY KEY (id)
);

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
VALUE ("Pearl", "Crabs", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Mermaid", "Man", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Barnacle", "Boy", 2, 7);

-- EMPLOYEE ROLE SEEDS -------
INSERT INTO role (title, salary, department_id)
VALUE ("Fry Cook", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Cashier", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("General Manager", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Server", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Hostess", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Onwer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("HR", 190000, 4);

SELECT * FROM role;
SELECT * FROM employee;
SELECT * FROM department; 



  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager