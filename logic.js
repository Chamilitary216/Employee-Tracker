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
            choices: [
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

            case "Update Employee":
                updateEmployee();
                break;  

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;

            case "Exit":
                connection.end();
                console.log("Come back again")


            
        }
    })
}

// View All Employees

const viewAllEmployees = () => {
    const query = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;"
    connection.query(query, (err, res) => {
        if (err) throw err
        console.table(res)
        initApp()
    })
}

// View All Roles

const viewByRoles = () => {
    const query = "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;"
    connection.query(query, (err, res)=>{
        if (err) throw err
        console.table(res)
        initApp()
    })    
}

// Sort by Department
const viewByDepartment = () => {
    const query = "SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;"
    connection.query(query, (err, res)=>{
        if (err) throw err
        console.table(res)
        initApp()
    })
}



// Roles for adding Employee

const roleArray = [];
function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    }

  })
  return roleArray;
}

//Rolls for Managers Add Prompt
const managersArray = [];
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArray.push(res[i].first_name);
    }

  })
  return managersArray;
}

function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "list",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1
      var managerId = selectManager().indexOf(val.choice) + 1
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(val)
          startPrompt()
      })

  })
}
//============= Update Employee ==========================//
  function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
    // console.log(res)
     if (err) throw err
     console.log(res)
    inquirer.prompt([
          {
            name: "lastName",
            type: "list",
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
          },
          {
            name: "role",
            type: "list",
            message: "What is the Employees new title? ",
            choices: selectRole()
          },
      ]).then(function(val) {
        var roleId = selectRole().indexOf(val.role) + 1
        connection.query("UPDATE employee SET WHERE ?", 
        {
          last_name: val.lastName
           
        }, 
        {
          role_id: roleId
           
        }, 
        function(err){
            if (err) throw err
            console.table(val)
            startPrompt()
        })
  
    });
  });

  }
//============= Add Employee Role ==========================//
function addRole() { 
  connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
    inquirer.prompt([
        {
          name: "Title",
          type: "input",
          message: "What is the roles Title?"
        },
        {
          name: "Salary",
          type: "input",
          message: "What is the Salary?"

        } 
    ]).then(function(res) {
        connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )

    });
  });
  }
//============= Add Department ==========================//
function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )
    })

}