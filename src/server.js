import express from 'express';
import { json } from 'express';
import usersRoutes from './routes/users_route.js';
import productsRoutes from './routes/products_route.js';
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const PORT = process.env.PORT;

app.use(json());
app.use('/users', usersRoutes);
app.use('/products',productsRoutes)

app.listen(PORT,() => {
    console.log(`App is running on port: ${PORT}`)
})