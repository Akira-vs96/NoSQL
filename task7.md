1-тапсырма. MongoDB
Создайте коллекцию books и выполните следующие действия.
books коллекциясын құрып, келесі әрекеттерді орындаңыз.
Добавьте три книги / Үш кітапты енгізіңіз.
Найдите книги, выпущенные после 2020 года / 2020 жылдан кейін шыққан кітаптарды табыңыз.
Измените год издания одной книги / Бір кітаптың шыққан жылын өзгертіңіз.
Удалите одну книгу / Бір кітапты жойыңыз.
Пример / Мысал:
use library

db.books.insertMany([
{title: "Python", year: 2021, author: "A"},
{title: "Java", year: 2019, author: "B"},
{title: "MongoDB", year: 2023, author: "C"}
])

db.books.find({year: {$gt: 2020}})

db.books.updateOne(
{title: "Java"},
{$set: {year: 2022}}
)

db.books.deleteOne({title: "Python"})
2-тапсырма. Cassandra
products кестесін құрып, негізгі операцияларды орындаңыз.
CREATE TABLE products (
id int PRIMARY KEY,
name text,
price decimal
);

INSERT INTO products (id, name, price)
VALUES (1, 'Laptop', 250000);

INSERT INTO products (id, name, price)
VALUES (2, 'Mouse', 5000);

SELECT * FROM products;

UPDATE products
SET price = 270000
WHERE id = 1;

DELETE FROM products
WHERE id = 2;
Ескерту: Cassandra тапсырмасын орындамас бұрын university keyspace таңдалуы тиіс. /