import bcrypt from 'bcrypt';
import { hash } from 'bcrypt';

import { 
    getUserbyId, 
    getUserByRole, 
    getAllUser, 
    getUserByEmail,
    registerNewUser, 
 
} from '../models/users_model.js';
import { generateToken } from '../utils/jwt_utils.js';

const userRegister = async (req, res) => {
    const {employee_name, employee_email, password, role} = req.body;
    const hashPassword = await hash(password, 10);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const emailValid = emailPattern.test(employee_email);
    try {
        if (password.length < 8){
            throw new Error('Password must be at least 8 characters long');
        }
        if (!emailValid) {
            throw new Error('Email parameter is not in the correct format');
        }
        const checkEmailAvailibility = await getUserByEmail(employee_email);
        if (checkEmailAvailibility) {
            throw new Error('Email has already been used.');
        }
        const newUser = await registerNewUser(employee_name, employee_email, hashPassword, role);
        res.status(201).json({
            "employee_id": newUser.employee_id,
            "employee_name": newUser.employee_name,
            "employee_email": newUser.employee_email,
            "role": newUser.role
        });
    } catch (err) {
        console.log({
            "message": "error on controller",
            "error": `${err.message}`
        })
        res.status(500)
        .json({
            "error": `${err.message}`
        })
    }
};

const userLogin = async (req, res) => {
    const {employee_id, password} = req.body;
    try {
        const user = await getUserbyId(employee_id);
        if (!user) {
            throw new Error ("Wrong employee_id")
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error ("Wrong password")
        }
        const token = await generateToken(employee_id);
        res.json({
            "status": "succeed",
            "message": "you are logged in",
            token
            });
    } catch (err) {
        console.log({
            "message": "error on controller",
            "error": `${err.message}`
        });
        res.status(500)
        .json({
            "error": `${err.message}`
        })
    }
};

const userList = async (req, res) => {
    const { employee_id, role } = req.body;
    try {
        if (employee_id) {
            const selectedUser = await getUserbyId(employee_id);
            if (typeof selectedUser === "undefined") {
                throw new Error("Incorrect employee_id. Please insert the correct code");
            }
            res.status(200).send(selectedUser);
        }
        if (role) {
            const selectedUser = await getUserByRole(role);
            if (typeof selectedUser === "undefined") {
                throw new Error("Incorrect role. Please insert the correct code");
            }
            res.status(200).send(selectedUser);
        }
        const selectedUser = await getAllUser();
        res.status(200).json(
            selectedUser.map(data => {
                return {
                    "employee_id": data.employee_id,
                    "employee_name": data.employee_name,
                    "employee_email": data.employee_email,
                    "role": data.role,
                }
            })
        );
    } catch (err) {
        console.log({
            "message": "error on controller",
            "error": `${err.message}`
        });
        res.status(500)
        .json({
            "error": `${err.message}`
        })
    }
};

export{ userRegister, userList, userLogin };