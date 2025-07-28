import express from "express";
const router = express.Router();

import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

const validateId = (id, res) => {
  const parsedId = parseInt(id);
  if (isNaN(parsedId) || parsedId <= 0) {
    res.status(400).send({ error: "Provided ID must be a positive integer." });
    return false;
  }
  return parsedId;
};

// GET /employees sends array of all employees
router.get('/', async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.send(employees);
  } catch (ex) {
    next(ex);
  }
});

// POST /employees
router.post('/', async (req, res, next) => {
  try {
    // Sends 400 if request body is not provided
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ error: "Request body not provided." });
    }

    const { name, birthday, salary } = req.body;

    // Sends 400 if request body is missing a required field
    if (!name || !birthday || salary === undefined) {
      return res.status(400).send({ error: "Missing required fields: name, birthday, and salary are required." });
    }
    // Basic validation for salary to be a number
    if (isNaN(parseInt(salary))) {
      return res.status(400).send({ error: "Salary must be a number." });
    }

    const newEmployee = await createEmployee({ name, birthday, salary });
    // Sends the newly created employee with status 201
    res.status(201).send(newEmployee);
  } catch (ex) {
    next(ex);
  }
});

// GET /employees/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = validateId(req.params.id, res);
    if (id === false) return; // Error already sent by validateId

    const employee = await getEmployee(id);

    // Sends 404 if employee does not exist
    if (!employee) {
      return res.status(404).send({ error: "Employee not found." });
    }
    // Sends employee with specified ID
    res.send(employee);
  } catch (ex) {
    next(ex);
  }
});

// DELETE /employees/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const id = validateId(req.params.id, res);
    if (id === false) return; // Error already sent by validateId

    const deletedEmployee = await deleteEmployee(id);

    // Sends 404 if employee does not exist
    if (!deletedEmployee) {
      return res.status(404).send({ error: "Employee not found." });
    }
    // Deletes the specified employee and sends status 204
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

// PUT /employees/:id updates employee with specified ID with provided data
router.put('/:id', async (req, res, next) => {
  try {
    const id = validateId(req.params.id, res);
    if (id === false) return; // Error already sent by validateId

    // Sends 400 if request body is not provided
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ error: "Request body not provided." });
    }

    const { name, birthday, salary } = req.body;

    // Sends 400 if request body is missing a required field
    if (!name || !birthday || salary === undefined) {
      return res.status(400).send({ error: "Missing required fields: name, birthday, and salary are required." });
    }
    // Validation for salary to be a number
    if (isNaN(parseInt(salary))) {
      return res.status(400).send({ error: "Salary must be a number." });
    }

    // Check if employee exists before attempting update
    const existingEmployee = await getEmployee(id);
    // Sends 404 if employee does not exist
    if (!existingEmployee) {
      return res.status(404).send({ error: "Employee not found." });
    }

    const updatedEmployee = await updateEmployee({ id, name, birthday, salary });
    // Updates and sends the employee with status 200
    res.status(200).send(updatedEmployee);
  } catch (ex) {
    next(ex);
  }
});

export default router;

// TODO: this file!
