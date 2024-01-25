import { hash } from 'bcrypt';
import { getUserbyId, getUserByRole, getAllUser, registerNewUser, loginUser } from '../models/users_model.js';
import { generateToken } from '../utils/jwt_utils.js';

const userRegister = async (req, res) => {
    const {employee_name, employee_email, password, role} = req.body;
    const hashPassword = await hash(password, 10);
    try {
        const newUser = await registerNewUser(employee_name, employee_email, hashPassword, role);
        res.status(201).send(newUser);
    } catch (err) {
        console.log(err);
        res.status(500)
        .json({
            "message": "error on controller",
            "error": `${err.message}`
        })
    }
}

const userList = async (req, res) => {
    const { employee_id, role } = req.body;
    try {
        if (employee_id) {
            const selectedUser = await getUserbyId(employee_id);
            if (typeof selectedUser === "undefined") {
                res.status(404).send("Incorrect employee_id. Please insert the correct code");
            }
            res.status(200).send(selectedUser);
        }
        if (role) {
            const selectedUser = await getUserByRole(role);
            if (typeof selectedUser === "undefined") {
                res.status(404).send("Incorrect employee_id. Please insert the correct code");
            }
            res.status(200).send(selectedUser);
        }
        const selectedUser = await getAllUser();
        res.status(200).send(selectedUser);
    } catch (err) {
        console.log(err);
        res.status(500)
        .json({
            "message": "error on controller",
            "error": `${err.message}`
        })
    }
}

const userLogin = async (req, res) => {
    const {employee_id, password} = req.body;
    try {
        const loginResult = await loginUser(employee_id, password);
        const token = await generateToken(employee_id);
        res.json({
            "login status": loginResult.status,
            "message": loginResult.message,
            token
            });
    } catch (err) {
        console.log(err);
        res.status(500)
        .json({
            "message": "error on controller",
            "error": `${err.message}`
        })
    }
}

export{ userRegister, userList, userLogin };