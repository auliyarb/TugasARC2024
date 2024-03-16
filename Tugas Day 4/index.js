const express = require('express');
const bodyParser = require('body-parser');
const moviesData = require('./movies.json'); // Import movies data

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Database
let database = { films: moviesData, nextId: moviesData.length + 1 }; // Inisialisasi nextId berdasrkan panjang dari moviesData

// Routes

// Get semua films
app.get('/films', (req, res) => {
  res.json(database.films);
});

// Get film dengan ID
app.get('/films/:id', (req, res) => {
  const film = database.films.find(film => film.imdbID === req.params.id); // Menggunakan imdbID untuk perbandingan
  if (!film) {
    res.status(404).send('Film not found');
  } else {
    res.json(film);
  }
});

// Menambahkan film baru
app.post('/films', (req, res) => {
  const newFilm = req.body;
  newFilm.imdbID = `tt${database.nextId++}`; // imdbID
  database.films.push(newFilm);
  res.status(201).send('Film added');
});

// Mengahpus film dengan ID
app.delete('/films/:id', (req, res) => {
  const index = database.films.findIndex(film => film.imdbID === req.params.id);
  if (index === -1) {
    res.status(404).send('Film not found');
  } else {
    database.films.splice(index, 1);
    res.status(200).send('Film deleted');
  }
});

// meng-update film dengan ID
app.put('/films/:id', (req, res) => {
  const index = database.films.findIndex(film => film.imdbID === req.params.id);
  if (index === -1) {
    res.status(404).send('Film not found');
  } else {
    database.films[index] = req.body;
    res.status(200).send('Film updated');
  }
});

// Pencarian films dengan nama
app.get('/films/search/:name', (req, res) => {
  const searchTerm = req.params.name.toLowerCase();
  const results = database.films.filter(film => film.Title.toLowerCase().includes(searchTerm)); // Use Title for comparison
  res.json(results);
});

// Memulai server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
