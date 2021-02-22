const inquirer = require ("inquirer");
const mysql = require ("mysql");
const consoleTable = require ("console.table");

const connection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    password: "root",
    database: "employee_trackerDB"

}),

connection.connect ((err) => {
    if (err) throw err
    initApp ()
})
