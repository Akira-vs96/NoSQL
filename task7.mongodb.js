// 1-тапсырма. MongoDB
// VS Code: MongoDB қосылымын таңдап, осы файлды Playground ретінде ашыңыз.
// Әр қадамның нәтижесін көру үшін use('library') жолымен бірге команданы таңдап,
// Run Selected Lines From Playground командасын орындаңыз.

// 1. library дерекқорын таңдау.
use('library');

// 2. books коллекциясын құру (бұрыннан бар болса, қайта құрылмайды).
use('library');
if (!db.getCollectionNames().includes('books')) {
  db.createCollection('books');
}

// 3. Үш кітапты енгізу.
// Ескерту: insertMany қайта орындалса, кітаптардың көшірмелері қосылады.
use('library');
db.books.insertMany([
  { title: 'Python', year: 2021, author: 'A' },
  { title: 'Java', year: 2019, author: 'B' },
  { title: 'MongoDB', year: 2023, author: 'C' }
]);

// 4. Барлық кітаптарды көрсету.
use('library');
db.books.find({});

// 5. 2020 жылдан кейін шыққан кітаптарды табу.
// Бос коллекцияға үш кітап енгізілген болса: Python (2021), MongoDB (2023).
use('library');
db.books.find({ year: { $gt: 2020 } });

// 6. Java кітабының шыққан жылын 2022 жылға өзгерту.
use('library');
db.books.updateOne(
  { title: 'Java' },
  { $set: { year: 2022 } }
);

// 7. Өзгертілген кітапты тексеру.
use('library');
db.books.find({ title: 'Java' });

// 8. Python кітабын жою.
use('library');
db.books.deleteOne({ title: 'Python' });

// 9. Жойылған кітапты тексеру: нәтиже бос болуы керек.
use('library');
db.books.find({ title: 'Python' });

// 10. Коллекцияның соңғы күйін көрсету.
// Бос коллекциядан басталған болса: Java (2022), MongoDB (2023).
use('library');
db.books.find({}, { _id: 0 }).sort({ title: 1 });
