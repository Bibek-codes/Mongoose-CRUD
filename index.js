const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const app = express();
app.use(express.json());
const Books = require('./book_model');

const mongoURI = "mongodb+srv://bkpcodes:Itiswhatitis_07*@cluster01.6bn6yow.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', async() => {
//     try {
//         // Create books
//         const book1 = new Books({
//             title:'DOM',
//             author:'Joe Doe',
//             category:'Technology',
//         });
//         await book1.save();
    
//         const book2 = new Books({
//             title:'Mango',
//             author:'Biswasray Sir',
//             category:'Fruit',
//         });
//         await book2.save();

//         const book3 = new Books({
//             title:'Universe',
//             author:'Captain Kirk',
//             category:'Astral',
//         });
//         await book3.save();
    
//         console.log('Books inserted successfully');
//       } catch (error) {
//         console.error('Error inserting books:', error);
//       }
//       finally {
//         // Close the connection
//         db.close();
        
//       }
        
// });

// db.createCollection("books");

app.get('/books',async(req,res)=>{
    try{
        const books = await Books.find()
        res.json(books);
    }
    catch(error){
        res.send(error);
    }
})

app.get('/books/:id',async(req,res)=>{
    try{
        const books = await Books.findById(req.params.id)
        if (!books) {
            return res.status(404).json({ error: 'Books not found' });
          }
          res.json(books);
        } catch (error) {
          res.json(error);
        }
})

app.post('/books',async(req,res)=>{
    const bookdata = req.body;
    Books.create(bookdata).
    then((books)=>{
        res.json(books);
    })
    .catch((error)=>{
        res.json(error);
    })
})

app.put('/:id', (req, res) => {
    const bookId = (req.params.id);
    const bookData = req.body;
    Books.findByIdAndUpdate(bookId,bookData, { new: true })
      .then((updatedBook) => {
        if (updatedBook) {
          res.json(updatedBook);
        } else {
          res.status(404).json({ error: 'Book not found' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Internal server error' });
      });
  });

app.delete('/:id', async (req, res) => {
    try {
      const book = await Books.findByIdAndDelete(req.params.id);
      if (!book) {
        return res.status(404).json({ error: 'Books not found' });
      }
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

const port =8080;

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})