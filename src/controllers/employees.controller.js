import { request, response } from "express";
import { pool } from "../db.js";



export const getEmployee = async (req = request, res = response) => {

  const {id} = req.params;

  try {
    const [result] = await pool.query("SELECT *  FROM employee WHERE id = ?", [id]);

    if(result.length <= 0 ) {
      return res.status(404).json({msg: "There are not employee with this id"})
    };

    res.status(200).json(result);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  };
};

export const getEmployees = async (req = request, res = response) => {

  try {
    const [result] = await pool.query("SELECT * FROM employee");
    res.status(200).json(result);

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  };
};

export const createEmployee = async (req = request, res = response) => {

  const {name, salary} = req.body;

  try {
    const [rows] = await pool.query("INSERT INTO employee (name, salary) VALUES (?,?)", [name, salary]);

    res.status(200).json({
      id: rows.insertId,
      name,
      salary
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  };
};

export const updateEmployee = async (req = request, res = response) => {
  const {id} = req.params;
  const {name, salary} = req.body;

  try {
    const [result] = await pool.query("UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?", [name, salary, id]);

    if(result.affectedRows <= 0) {
      return res.status(404).json({msg: "There is no employee with that id that we can update"})
    };

    const [updateEmployee] = await pool.query("SELECT * FROM employee WHERE id = ?", [id]);

    res.status(200).json(updateEmployee);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  };
};

export const deleteEmployee = async (req = request, res = response) => {
  const {id} = req.params;

  try {
    const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [id]);

    if(result.affectedRows <= 0) {
      return res.status(404).json({msg: "There is no employee with that id that we can delete"})
    };

    res.status(200).json({msg: "Employee was delete"});
    
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  };
};