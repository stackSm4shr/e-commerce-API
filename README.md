# eCommerce REST API
This is a REST API built using Node.js and Express.js for eCommerce. It provides endpoints for user authentication, product management, review management, and order management.


## Features

- User registration
- User login and logout
- Product creation, update, deletion, and retrieval
- Review creation, update, deletion, and retrieval
- Order creation, update, deletion, and retrieval
- Image upload for products
- JWT-based authentication

## Tech Stack
**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

**Image Upload:** 
- Cloudinary API

**Data Storage:** 
- MongoDB

**User Authentication:**
- JSON Web Tokens (JWT)

#### User Authentication
- `POST /auth/register` - Register a new user.
- `POST /auth/login` -    Login with an existing user.
- `GET /auth/logout` -    Logout the current user.

#### User
- `GET /users` - Get all users.
- `GET /users/:id` -    Get single user.
- `GET /users/showMe` -  Show current user.
- `PUT /users/updateUser` -  Update user profile.

#### Products
- `GET /products` - Get all products.
- `POST /products` -    Create a new product.
- `GET /products/:id` -    Get a single product by ID .
- `PUT /products/:id` -   Update a product by ID .
- `DELETE /products/:id` -   Delete a product by ID .

#### Order
- `GET /orders` - Get all orders.
- `POST /orders` -    Create a order .
- `GET /orders/:id` -    Get a single order.
- `PATCH /orders/:id` -   Update a order.
- `GET /orders/showAllMyOrder` -   Get a current user orders.
