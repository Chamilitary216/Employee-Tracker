const inquirer = require ("inquirer");
const mysql = require ("mysql");
const consoleTable = require ("console.table");


const connection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ccurry216",
    database: "employee_trackerDB"

});

connection.connect ((err) => {
    if (err) throw err
    initApp ()
})

const initApp = ()=> {
    inquirer.prompt ({
            type: "list",
            message: "Select what you would like to do from the list",
            name: "choice",
            choice: [
                "View All Employees?",
                "Sort Employees By Role?",
                "Sort Employees By Departments?",
                "Add Employee?",
                "Add Role",
                "Add Department",
                "Update Employee",
            ]
    })
    .then(function(val) {
        switch (val.choice) {
            case "View All Employees?":
                viewAllEmployees();
                break;
             
            case "Sort Employees By Role":
                viewByRoles();
                break;    

            case "Sort Employees By Department":
                viewByDepartment();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Add Role":
                addRole();
                break;
        }
    })
}
