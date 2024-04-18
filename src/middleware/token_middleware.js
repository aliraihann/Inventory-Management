import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
const generalKey = [process.env.OPR_KEY, process.env.STF_KEY, process.env.SPV_KEY];
const editQuantityKey = [process.env.STF_KEY, process.env.SPV_KEY];

function getTokenAuthentication (req, res, next) {
    const autHeader = req.headers.authorization;
    const headerToken = autHeader && autHeader.split(' ')[1];
    if (!headerToken) return res.status(404).send('You are not authorized');
    let isAuthenticated = false;
    for (const key of generalKey) {
        jwt.verify(headerToken, key, (err, user) => {
          if (!err) {
            req.authentication = true;
            isAuthenticated = true;
            return next();
          }
        });
        if (isAuthenticated) break;
    }
    if (!isAuthenticated) {
        return res.status(401).send('You are not authorized');
    }
}

function updateItemTokenAuthentication (req, res, next) {
    const autHeader = req.headers.authorization;
    const headerToken = autHeader && autHeader.split(' ')[1];
    if (!headerToken) return res.status(404).send('You are not authorized on header');

    jwt.verify(headerToken, process.env.SPV_KEY, (err, user) => {
        if(err) return res.status(401).send('You are not authorized');
        req.authentication = true;
        let decoded = jwt.decode(headerToken, {complete : true});
        req.employeeId = decoded.payload.employee_id;
        next();
    })
}


function updateQuantityTokenAuthentication (req, res, next) {
    const autHeader = req.headers.authorization;
    const headerToken = autHeader && autHeader.split(' ')[1];
    if (!headerToken) return res.status(404).send('You are not authorized header');
    let isAuthenticated = false;
    for (const key of editQuantityKey) {
        jwt.verify(headerToken, key, (err, user) => {
          if (!err) {
            req.authentication = true;
            isAuthenticated = true;
            let decoded = jwt.decode(headerToken, {complete : true});
            req.employeeId = decoded.payload.employee_id
            next();
          }
        });
        if (isAuthenticated) break;
    }
    if (!isAuthenticated){
        return res.status(401).send('You are not authorized');
    }
}

export { getTokenAuthentication, updateItemTokenAuthentication, updateQuantityTokenAuthentication }