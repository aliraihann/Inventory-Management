import dbPool from "../config/database.js";

async function getUserbyId(employee_id) {
    try {
        const [rows] = await dbPool.query(`
        SELECT * FROM users
        WHERE employee_id = ?
        `, [employee_id])
        return rows[0];
    } catch (err) {
        throw new Error(err.message)
    }
}

async function getUserByRole(role) {
    try {
        const [rows] = await dbPool.query(`
        SELECT * FROM users
        WHERE role= ?
        `, [role])
        return rows;
    } catch (err) {
        throw new Error(err.message)
    }
}

async function getAllUser() {
    try {
        const [rows] = await dbPool.query(`
        SELECT * FROM users
        `)
        return rows;
    } catch (err) {
        throw new Error(err.message)
    }
}
async function getUserByEmail(employee_email) {
    try {
        const [rows] = await dbPool.query(`
        SELECT * FROM users
        WHERE employee_email = ?
        `,[employee_email])
        return rows;
    } catch (err) {
        throw new Error(err.message)
    }
}

async function registerNewUser(employee_name, employee_email, hashPassword, role) {
    try {
        const [insertUser] = await dbPool.query(`
        INSERT INTO users (employee_name, employee_email, password, role)
        VALUE (?,?,?,?)
        `,[employee_name, employee_email, hashPassword, role]);
        const id = insertUser.insertId;
        return getUserbyId(id);
    } catch (err) {
        throw new Error(err.message)
    }
}

export { 
    getUserbyId, 
    getUserByRole, 
    getAllUser, 
    getUserByEmail,
    registerNewUser
 };