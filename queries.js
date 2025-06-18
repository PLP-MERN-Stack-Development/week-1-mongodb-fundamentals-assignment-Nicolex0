// Switch to plp_bookstore db and creating the books collection
use plp_bookstore
db.createCollection("books")

// Add books in insert_books.js to db
npm install mongodb
node insert_books.js

// Insert books into insert_books.js
db.books.insertMany([
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: "J. B. Lippincott & Co."
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: "Secker & Warburg"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: "Charles Scribner's Sons"
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: "Chatto & Windus"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: "George Allen & Unwin"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: "Little, Brown and Company"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: "T. Egerton, Whitehall"
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: "Allen & Unwin"
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    genre: "Political Satire",
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: "Secker & Warburg"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: "HarperOne"
  }
])

// Find all books in a specific genre
db.books.find({ genre: "Fiction" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 1950 } })

// Find books by a specific author
db.books.find({ author: "George Orwell" })

// Update the price of a specific books
db.books.updateOne(
  { title: "The Hobbit" },
  { $set: { price: 16.99 } }
)

// Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" })

// Write a query to find books that are both in stock and published after 2010
db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } }
)

// Use projection to return only the title, author, and price fields in your queries
db.books.find(
  { genre: "Fiction" },
  { title: 1, author: 1, price: 1, _id: 0 }
)

// Implement sorting to display books by price (both ascending and descending)
db.books.find().sort({ price: 1 })
db.books.find().sort({ price: -1 })


// Use the `limit` and `skip` methods to implement pagination (5 books per page)
db.books.find().skip(0).limit(5)
db.books.find().skip(5).limit(5)
db.books.find().skip(10).limit(5)
db.books.find({}, { title: 1, price: 1, _id: 0 })
  .sort({ price: 1 })
  .skip(5)
  .limit(5)

// Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  }
])

// Create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
])

// Implement a pipeline that groups books by publication decade and counts them

// Create an index on the `title` field for faster searches
// Create a compound index on `author` and `published_year`
// Use the `explain()` method to demonstrate the performance improvement with your indexes


