# Storefront Backend Project


## running project
- install package npm install
- npm install dotenv
- npm install -g db-migrate
- npm install db-migrate db-migrate-pg
- db-migrate up
- using npm run start
- in watch mode npm run watch 

 ## testing project
 - using npm run test

## project databases
- database for development books_dev
- database for test books_test

## tables for the project 
- users
- products
- orders 
- order_products

## routes for usres
- to create user (/register)
- for user login (/login)
- for show specific user (/users/:id)
- to show all users (/users)


## routes for products 
- to create product (/createproduct)
- to show product (/products/:id)
- to delete product (/deleteproduct/:id)
- to get all products (/products)


## routes for orders 
- to create order for the current user (/createorder)
- to show order (/orders/:id)
- to get all orders (/orders)
- to add products for the current order (/orders/:orderId/products)

## Environment variables
TEST_VAR=testing123
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=books_dev
POSTGRES_TEST_DB=books_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=InspectoR9862
BCRYPT_PASSWORD=speak-friend-and-enter
SALT_ROUNDS=10
TOKEN_SECRET=secret
ENV=dev





