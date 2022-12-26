CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    username VARCHAR(100),
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    password VARCHAR(200)
);