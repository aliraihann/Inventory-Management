import jwt from 'jsonwebtoken';
import {getUserbyId} from '../models/users_model.js';
import dotenv from 'dotenv'

dotenv.config()

const generateToken = async function (employee_id) {
    try {
        const user = await getUserbyId(employee_id);
        if (!user) return res.status(404).send("insert employee_id");
        const roleKeyMap = {
            operator: process.env.OPR_KEY,
            staff: process.env.STF_KEY,
            supervisor: process.env.SPV_KEY,
        };
        const key = roleKeyMap[user.role];
        const expiresIn = 60 * 30 * 1 ;
        const accessToken = jwt.sign(
            {
            employee_id: user.employee_id, 
            employee_name: user.employee_name
            },
            key,
            {expiresIn: expiresIn}
        )
        return accessToken;
    } catch (err) {
        return(`
        Message: error on utility,
        Error: ${err.message}
        `)
    }
}

export {generateToken};