const { Pool } = require('pg');
const pool = require('../database');
const {getAllNOtes}= require('../models/notes');


function renderNotes (req,res){
    res.json(getAllNOtes)

}











// const getUsers = async (req, res) => {
//     const response = await pool.query('SELECT * FROM users ORDER BY userid ASC');
//     res.status(200).json(response.rows);
// };

// const getUserById = async (req, res) => {
//     const id = parseInt(req.params.id);
//     const response = await pool.query('SELECT * FROM users WHERE userid = $1', [id]);
//     res.json(response.rows);
// };

// const createUser = async (req, res) => {
//     console.log(req.body)
//     const { username, password }=req.body;
//     console.log(username)
//     const response = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username ,password]);
//     res.json({
//         message: 'User Added successfully',
//         body: {
//             user: {username, password}
//         }
//     })
// };

// const updateUser = async (req, res) => {
//     const id = parseInt(req.params.id);
//     const { username ,password } = req.body;

//     const response =await pool.query('UPDATE users SET name = $1, password = $2 WHERE userid = $3', [
//         username,
//         password,
//         id
//     ]);
//     res.json('User Updated Successfully');
// };

// const deleteUser = async (req, res) => {
//     const userid = parseInt(req.params.id);
//     await pool.query('DELETE FROM users where userid = $1', [
//         id
//     ]);
//     res.json(`User ${id} deleted Successfully`);
// };

module.exports = {
}

