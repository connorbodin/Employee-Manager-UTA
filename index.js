const { prompt } = require("inquirer");
const mysql = require("mysql2");
const { kill } = require("process");
const { start } = require("repl");
require("console.table");
const db = require("./db");

// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

function init() {
  startQuestions();
}

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
          value: "ADD_DEPARTMENT",
        },
        {
          type: "input",
          name: "Add a role",
          value: "ADD_ROLE",
        },
        {
          type: "input",
          name: "Add an employee",
          value: "ADD_EMPLOYEE",
        },
        {
          type: "input",
          name: "Update an employee",
          value: "UPDATE_EMPLOYEE",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]);

  switch (choice) {
    case "VIEW_DEPARTMENTS":
      return viewDepartments();
    case "VIEW_ROLES":
      return viewRoles();
    case "VIEW_EMPLOYEES":
      return viewEmployees();
    case "ADD_ROLE":
      return addRole();
    case "ADD_EMPLOYEE":
      return addEmployee();
    case 'ADD_DEPARTMENT':
      return addDepartment();
    case "QUIT":
      return quitFunction();
  }
}

async function viewDepartments() {
  const departments = await db.viewAllDepartments();
  console.table(departments);
  startQuestions();
}

async function viewRoles() {
  const roles = await db.viewAllRoles();
  console.table(roles);
  startQuestions();
}

async function viewEmployees() {
  const employees = await db.viewAllEmployees();
  console.table(employees);
  startQuestions();
}
async function quitFunction() {
  console.log("Goodbye!");
  process.exit(0);
  
};

async function addRole() {
  const departments = await db.viewAllDepartments();
  console.log(departments);
  const departmentsList = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));


  const role = await prompt([
    {
      name: "title",
      message: "Enter the role:",
    },
    {
      name: "salary",
      message: "Enter the salary:",
    },
    {
      type: "list",
      name: "department_id",
      message: "Choose the department:",
      choices: departmentsList,
    },
  ]);

  await db.addNewRole(role);

  startQuestions();
}

async function addDepartment() {
  const department = await prompt([
    {
      name: "name",
      message: "Enter the department name:",
    },
  ]);

  await db.addNewDepartment(department);

  startQuestions();
}

async function addEmployee() {
  const roles = await db.viewAllRoles();
  const employees = await db.viewAllEmployees();

  const employee = await prompt([
    {
      name: "first_name",
      message: "Enter the Employee's first name:",
    },
    {
      name: "last_name",
      message: "Enter the Employee's last name:",
    },
  ]);

  const rolesList = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await prompt({
    type: "list",
    name: "roleId",
    message: "Choose the employee's role:",
    choices: rolesList,
  });

  employee.role_id = roleId;

  const managersList = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));
  managersList.unshift({ name: "None", value: null });

  const { managerId } = await prompt({
    type: "list",
    name: "managerId",
    message: "Choose the employee's manager:",
    choices: managersList,
  });

  employee.manager_id = managerId;

  await db.addNewEmployee(employee);

  startQuestions();
}

init();
