// Nama : Auliya Rahmah Basallamah
// NIM : 16423459


// Import library Axios
const axios = require('axios');

// URL API endpoint
const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';

// GET request dengan Axios
axios.get(apiUrl)
  .then(response => {
    // Menangani respons sukses
    console.log('Response:', response.data);
  })
  .catch(error => {
    // Menangani errors selama request
    console.error('Error:', error);
  });
