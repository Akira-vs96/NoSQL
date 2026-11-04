// Іске қосу: mongosh --file mongodb.js
db = db.getSiblingDB("library");

// 1. books коллекциясын құру.
if (!db.getCollectionNames().includes("books")) {
  db.createCollection("books");
}

// 2. Үш кітапты енгізу.
print("Үш кітапты енгізу:");
printjson(db.books.insertMany([
  { title: "Python", year: 2021, author: "A" },
  { title: "Java", year: 2019, author: "B" },
  { title: "MongoDB", year: 2023, author: "C" }
]));

// 3. 2020 жылдан кейін шыққан кітаптарды табу.
print("2020 жылдан кейін шыққан кітаптар:");
printjson(db.books.find(
  { year: { $gt: 2020 } },
  { _id: 0 }
).toArray());

// 4. Java кітабының шыққан жылын 2022 жылға өзгерту.
print("Java кітабының шыққан жылын өзгерту:");
printjson(db.books.updateOne(
  { title: "Java" },
  { $set: { year: 2022 } }
));

// 5. Python кітабын жою.
print("Python кітабын жою:");
printjson(db.books.deleteOne({ title: "Python" }));

// Соңғы күйді көрсету.
print("Коллекцияда қалған кітаптар:");
printjson(db.books.find({}, { _id: 0 }).sort({ title: 1 }).toArray());
