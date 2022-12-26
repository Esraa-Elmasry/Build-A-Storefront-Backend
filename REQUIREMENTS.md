# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
## tables for the project 
- users
- products
- orders 
- order_products

## routes for usres
- to create user POST(/register)
- for user login POST(/login)
- for show specific user GET(/users/:id)
- to show all users GET(/users)


## routes for products 
- to create product POST(/createproduct)
- to show product GET(/products/:id)
- to delete product DELETE(/deleteproduct/:id)
- to get all products GET(/products)


## routes for orders 
- to create order for the current user POST(/createorder)
- to show order GET(/orders/:id)
- to get all orders GET(/orders)
- to add products for the current order POST(/orders/:orderId/products)

## Data Shapes
#### Product
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    author VARCHAR(200),
    price integer,
    category VARCHAR(200)


#### User
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    username VARCHAR(100),
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    password VARCHAR(200)

#### Orders
    id SERIAL PRIMARY KEY,
    status VARCHAR(200),
    user_id BIGINT REFERENCES users(id)

### Order_products
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id)

