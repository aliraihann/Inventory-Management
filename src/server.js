import dotenv from 'dotenv';
import makeApp from './app';
import dbPool from './config/database';
import app from './app';
dotenv.config()

const PORT = process.env.PORT;

const app = makeApp(dbPool);

app.listen(PORT || 3000,() => {
    console.log(`App is running on port: ${PORT}`)
})