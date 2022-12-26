CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id)
);