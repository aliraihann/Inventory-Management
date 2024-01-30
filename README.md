# Inventory-Management API Project

Welcome to the Inventory Management API project! This API is a comprehensive solution built to streamline the process of managing your product inventory effectively. Developed with Node.js, a powerful server-side JavaScript runtime, and MySQL, a reliable relational database management system, this project offers a reliable and scalable solution.

## Table of Contents

1. [Key Features](#key-features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#set-up-and-installation)
4. [API Endpoints](#api-endpoints)
6. [Usage](#usage)

## Key Features:
- User Management: Register new users, manage user roles, and enable user authentication for secure access.
- Product Operations: Add new products, update product quantities, delete products, and retrieve product information.
- Authentication: Implement secure authentication using JSON Web Tokens (JWT) for authorized access to protected endpoints.

## Technologies used

  | Technology        | Description                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------- |
| **Node.js**       | Server-side JavaScript runtime.                                                            |
| **Express.js**    | Web application framework for Node.js, utilized for building robust APIs.                   |
| **MySQL**         | Relational database management system for storing and retrieving data.                       |
| **MySQL2**        | Node.js-based MySQL library, used for interacting with MySQL database.                         |
| **dotenv**        | Zero-dependency module for loading environment variables from a `.env` file.                 |
| **jsonwebtoken**  | Library for generating and verifying JSON Web Tokens used for authentication.              |
| **bcrypt**        | Library for hashing passwords, enhancing security for user authentication.                |
| **Postman**| Tool for testing endpoints.    |


## Set up and Installation

Make sure you have the following installed on your machine:

- Node.js
- MySQL

1. **Clone the repository:**
     ```bash
       git clone https://github.com/aliraihann/inventory-management.git

2. **Install Dependencies**
      ```bash
        cd inventory-management
        npm install

4. **Set up the MySQL Database**
   Create a database and update the connection details in .env file:
      ```bash
        DB_HOST=your-mysql-host
        DB_USER=your-mysql-username
        DB_PASS=your-mysql-password
        DB_NAME=your-database-name

6. **Generate JWT keys**
  Update the .env file with your JWT secret keys:
   ```bash
      OPR_KEY=your-operator-key
      STF_KEY=your-staff-key
      SPV_KEY=your-supervisor-key

## API Endpoints

### Users

| Endpoint               | Method | Description                 | Auth Required | Request Body |
|------------------------|--------|-----------------------------|---------------|--------------|
| `/users/register`      | POST   | Register a new user.        | No            | `{ "employee_name": "...", "employee_email": "...", "password": "...", "role": "..." }` |
| `/users/login`         | POST   | User login.                 | No            | `{ "employee_id": "...", "password": "..." }`         |
| `/users/list`          | GET    | Get a list of users.         | Yes           | -            |

### Products

| Endpoint               | Method | Description                          | Auth Required | Request Body |
|------------------------|--------|--------------------------------------|---------------|--------------|
| `/products/add`        | POST   | Add a new product.                   | Yes           | `{ "product_name": "...", "product_category": "...", "quantity": ..., "date": "..." }` |
| `/products/list`       | GET    | Get a list of products.              | Yes           | -,  `{ "sku": "..." }`, `{ "product_name": "..." }` , `{ "product_category": "..." }` |
| `/products/quantity`   | PUT    | Update product quantity.             | Yes           | `{ "sku": "...", "quantity": ..., "date": "..." }`   |
| `/products/delete`     | DELETE | Delete a product.                    | Yes           | `{ "sku": "..." }`                                   |
<!--
| `/products/list`       | GET    | Get product by SKU.                  | Yes           | `{ "sku": "..." }`                                   |
| `/products/list`       | GET    | Get products by name.                | Yes           | `{ "product_name": "..." }`                          |
| `/products/list`       | GET    | Get products by category.            | Yes           | `{ "product_category": "..." }`                      |
-->


## Usage
<!--
**Run the Server**
Start the server by running:  npm start

The server will be running at http://localhost:your-port.


## Usage:

### Run the Server:

To start the server, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/aliraihann/inventory-management.git

2. **Install Dependencies:**

   ```bash
    cd inventory-management
    npm install
    Set up the MySQL Database:

3. **Create a database and update the connection details in the .env file:**

   ```bash
    DB_HOST=your-mysql-host
    DB_USER=your-mysql-username
    DB_PASS=your-mysql-password
    DB_NAME=your-database-name
    Generate JWT Keys:

4. **Update the .env file with your JWT secret keys:**

   ```bash
    OPR_KEY=your-operator-key
    STF_KEY=your-staff-key
    SPV_KEY=your-supervisor-key
-->

### API Usage

- **Users**
1. **Register a new user:**
      ```bash
    Endpoint: /users/register
    Method: POST
    Auth Required: No
    Request Body:

    {
      "employee_name": "John Doe",
      "employee_email": "john.doe@example.com",
      "password": "password123",
      "role": "staff"
    }

3. **Get a list of users:**
      ```bash
       Endpoint: /users/list
       Method: GET
       Auth Required: Yes
4. **User login:**
      ```bash
    Endpoint: /users/login
    Method: POST
    Auth Required: No   
    Request Body:
    {
      "employee_id": "john.doe@example.com",
      "password": "password123"
    }

- **Products**

1. **Add a new product:**
      ```bash
    Endpoint: /products/add
    Method: POST
    Auth Required: Yes
    Request Body:
    {
      "product_name": "New Product",
      "product_category": "Electronics",
      "quantity": 100
    }

2. **Get a list of products:**
      ```bash
    Endpoint: /products/list
    Method: GET
    Auth Required: Yes

4. **Get product by SKU:**
      ```bash
    Endpoint: /products/list
    Method: GET
    Auth Required: Yes
    Request Body:
    {
      "sku": "your-product-sku"
    }

6. **Get products by name:**
      ```bash
    Endpoint: /products/list
    Method: GET
    Auth Required: Yes
    Request Body:
    {
      "product_name": "Your Product Name"
    }
   
7. **Get products by category:**
      ```bash
    Endpoint: /products/list
    Method: GET
    Auth Required: Yes
    Request Body:
    {
      "product_category": "Electronics"
    }
   
8. **Update product quantity:**
      ```bash
    Endpoint: /products/quantity
    Method: PUT
    Auth Required: Yes
    Request Body:
    {
      "sku": "your-product-sku",
      "quantity": 150
    }
   
9. **Delete a product:**
      ```bash
      Endpoint: /products/delete
      Method: DELETE
      Auth Required: Yes
      Request Body:
        {
          "sku": "your-product-sku"
        }


