import dbPool from "../config/database.js";
import bcrypt from 'bcrypt';

async function getUserbyId(employee_id) {
    try {
        const [rows] = await dbPool.query(`
        SELECT * FROM users
        WHERE employee_id = ?
        `, [employee_id])
        return rows[0];
    } catch (err) {
        return({
            "message": "error on model",
            "error": `${err.message}`
        })
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
        return({
            "message": "error on model",
            "error": `${err.message}`
        })
    }
}

async function getAllUser() {
    try {
        const [rows] = await dbPool.query(`
        SELECT * FROM users
        `)
        return rows;
    } catch (err) {
        return({
            "message": "error on model",
            "error": `${err.message}`
        })
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
        return({
            "message": "error on model",
            "error": `${err.message}`
        })
    }
}

async function loginUser(employee_id, password) {
    try {
        const user = await getUserbyId(employee_id);
        if (!user) {
            return ({
                "status": "login failed",
                "message": "wrong employee_id"
            })
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return ({
                "status": "login failed",
                "message": "wrong password"
            })
        }
        return ({
            "status": "succeed",
            "message": "you are logged in"
        })
    } catch (err) {
        return(`
        Message: error on model,
        Error: ${err.message}
        `)
    }
}
export { getUserbyId, getUserByRole, getAllUser, registerNewUser, loginUser };