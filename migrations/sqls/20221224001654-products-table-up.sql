CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    author VARCHAR(200),
    price integer,
    category VARCHAR(200)
);