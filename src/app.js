import express from "express";
import { json } from "express";
import usersRoutes from "./routes/users_route.js";
import productsRoutes from "./routes/products_route.js";

export default function (database) {
  const app = express();

  app.use(json());
  app.use("/users", usersRoutes);
  app.use("/products", productsRoutes);

  return app;
}

// the below code is commented for testing purposes
// const app = express();

// app.use(json());
// app.use('/users', usersRoutes);
// app.use('/products',productsRoutes)

// export default app;
