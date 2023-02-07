const { prompt } = require('inquirer');
const mysql = require("mysql2");
require("console.table");
const db = require('./db');

// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

function init() {
    startQuestions();
};

async function startQuestions() {
  const { choice } = await prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: [
        {
          type: "input",
          name: "View all departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          type: "input",
          name: "View all roles",
          value: "VIEW_ROLES",
        },
        {
          type: "input",
          name: "View all employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          type: "input",
          name: "Add a department",
          value: "ADD_DEPART",
        },
        {
          type: "input",
          name: "Add a role",
          value: "github",
        },
        {
          type: "input",
          name: "Add an employee",
          value: "github",
        },
        {
          type: "input",
          name: "Update an employee",
          value: "github",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ]
    }
  ])

  switch (choice) {
    case "VIEW_DEPARTMENTS":
      return viewDepartments();
    case "VIEW_ROLES":
        return viewRoles();
    case "VIEW_EMPLOYEES":
      return viewEmployees();
    case "QUIT": 
    return quit();
  }
};

async function viewDepartments() {
    const departments = await db.viewAllDepartments();
    console.table(departments);
    startQuestions();
};

async function viewRoles() {
    const roles = await db.viewAllRoles();
    console.table(roles);
    startQuestions();
};

async function viewEmployees() {
  const employees = await db.viewAllEmployees();
  console.table(employees);
  startQuestions();
};


init();

