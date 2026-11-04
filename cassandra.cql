-- Іске қосу: cqlsh -f cassandra.cql

-- 1. Жергілікті бір түйінді орта үшін university keyspace құру.
CREATE KEYSPACE IF NOT EXISTS university
WITH replication = {
    'class': 'SimpleStrategy',
    'replication_factor': 1
};

-- Кестемен жұмыс басталмас бұрын university keyspace таңдау.
USE university;

-- 2. products кестесін құру.
CREATE TABLE IF NOT EXISTS products (
    id int PRIMARY KEY,
    name text,
    price decimal
);

-- 3. Екі өнімді енгізу.
INSERT INTO products (id, name, price)
VALUES (1, 'Laptop', 250000);

INSERT INTO products (id, name, price)
VALUES (2, 'Mouse', 5000);

-- 4. Барлық өнімдерді шығару.
SELECT * FROM products;

-- 5. Laptop бағасын өзгерту.
UPDATE products
SET price = 270000
WHERE id = 1;

-- Өзгертілген өнімді тексеру.
SELECT * FROM products WHERE id = 1;

-- 6. Mouse өнімін жою.
DELETE FROM products
WHERE id = 2;

-- Кестенің соңғы күйін көрсету.
SELECT * FROM products;
