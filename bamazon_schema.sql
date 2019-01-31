CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
item_id integer(10) auto_increment not null,
product_name varchar(100),
department_name varchar(100),
price decimal(15, 2),
stock_quantity integer(10),
primary key(item_id)
);

SELECT * FROM products;
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Rapid Cell Phone Charger(Type C)', 'Electronics', 12.99, 2748);