-- 2-тапсырма. Cassandra
-- VS Code: SQLTools ішінде Task7 Cassandra қосылымын таңдаңыз.
-- Қажетті команданы толық таңдап, Ctrl+E, Ctrl+E пернелерін басыңыз.
-- Командаларды төмендегі ретпен орындаңыз.

-- 1. Жергілікті бір түйінді ортада university keyspace құру.
-- Keyspace бұрыннан бар болса, бұл команда оны өзгертпейді.
CREATE KEYSPACE IF NOT EXISTS university
WITH replication = {
    'class': 'SimpleStrategy',
    'replication_factor': 1
};

-- 2. Кестемен жұмыс басталмас бұрын university keyspace таңдау.
USE university;

-- 3. products кестесін құру.
-- Әр команданы бөлек орындауға ыңғайлы болу үшін
-- кесте атауы барлық жерде university.products деп толық көрсетілген.
CREATE TABLE IF NOT EXISTS university.products (
    id int PRIMARY KEY,
    name text,
    price decimal
);

-- 4. Laptop өнімін енгізу.
INSERT INTO university.products (id, name, price)
VALUES (1, 'Laptop', 250000);

-- 5. Mouse өнімін енгізу.
INSERT INTO university.products (id, name, price)
VALUES (2, 'Mouse', 5000);

-- 6. Барлық өнімдерді көрсету.
SELECT * FROM university.products;

-- 7. Laptop бағасын 270000 мәніне өзгерту.
UPDATE university.products
SET price = 270000
WHERE id = 1;

-- 8. Бағаның өзгергенін тексеру.
SELECT * FROM university.products WHERE id = 1;

-- 9. Mouse өнімін жою.
DELETE FROM university.products
WHERE id = 2;

-- 10. Өнімнің жойылғанын тексеру: нәтиже бос болуы керек.
SELECT * FROM university.products WHERE id = 2;

-- 11. Кестенің соңғы күйін көрсету: Laptop, 270000.
SELECT * FROM university.products;
