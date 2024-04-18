# Inventory-Management API Project

Welcome to the Inventory Management API project! This API is a comprehensive solution built to streamline managing your product inventory effectively. Developed with Node.js, a powerful server-side JavaScript runtime, and MySQL, a reliable relational database management system, this project offers a reliable and scalable solution.

## Table of Contents

1. [Key Features](#key-features)
2. [Project Instroduction](#project-instroduction)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
5. [Entity Relationship Diagram](#entity-relationship-diagram)
6. [Project Link](#Project-Link)
7. [API Endpoints](#api-endpoints)
8. [Usage](#usage)

## Key Features:
- User Management: Register new users, manage user roles, and enable user authentication for secure access.
- Product Operations: Add new products, update product quantities, delete products, and retrieve product information.
- Authentication: Implement secure authentication using JSON Web Tokens (JWT) for authorized access to protected endpoints.

## Project Introduction
This project introduces three user roles: operator, staff, and supervisor, each with different authorizations. Operators can view inventory data, staff can view and modify item quantities, and supervisors can perform a range of actions including modifying item quantities and adding/removing items.

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

## Setup and Installation

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

5. **Set up the MySQL connection**
   Create a database connection
     ```bash
        mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        }).promise();

7. **Generate JWT keys**
  Update the .env file with your JWT secret keys:
   ```bash
      OPR_KEY=your-operator-key
      STF_KEY=your-staff-key
      SPV_KEY=your-supervisor-key

## Entity Relationship Diagram
![ERD of the Database](https://github.com/aliraihann/Inventory-Management-API/blob/b3a7b2afde74139f128780d6fbbfb8a7ab7877b5/ERD%20for%20Inventory%20Management.png)

## Project Link
https://railway.app/project/5197003b-4f79-4da3-a0ad-4cdda2fef962/service/08fb184c-acd5-429d-b82a-8a60be077441

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

### API Usage

- **Users**
1. **Register a new user:**
      ```bash
    Endpoint: /users/register
    Method: POST
    Auth Required: No
    Role Option:
        - Supervisor
        - Staff
        - Operator
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
      Eligible Role: All Role
      
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
    Eligible Role: Supervisor Only
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
    Eligible Role: All Role

4. **Get product by SKU:**
      ```bash
    Endpoint: /products/list
    Method: GET
    Auth Required: Yes
    Eligible Role: All Role
    Request Body:
    {
      "sku": "your-product-sku"
    }

6. **Get products by name:**
      ```bash
    Endpoint: /products/list
    Method: GET
    Auth Required: Yes
    Eligible Role: All Role
    Request Body:
    {
      "product_name": "Your Product Name"
    }
   
7. **Get products by category:**
      ```bash
    Endpoint: /products/list
    Method: GET
    Auth Required: Yes
    Eligible Role: All Role
    Request Body:
    {
      "product_category": "Electronics"
    }
   
8. **Update product quantity:**
      ```bash
    Endpoint: /products/quantity
    Method: PUT
    Auth Required: Yes
    Eligible Role: Supervisor & Staff Only
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
      Eligible Role: Supervisor Only
      Request Body:
        {
          "sku": "your-product-sku"
        }


