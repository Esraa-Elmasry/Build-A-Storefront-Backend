CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(200),
    user_id BIGINT REFERENCES users(id)
);