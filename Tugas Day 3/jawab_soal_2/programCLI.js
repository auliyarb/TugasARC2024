// Nama : Auliya Rahmah Basallamah
// NIM : 16423459


// Import library readline untuk menerima input user
const readline = require('readline');

// Interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fungsi untuk mengambil input user
function collectInput(callback) {
  const names = [];
  const studentNumbers = [];
  const faculties = [];

  function askData() {
    rl.question('Enter your name: ', (name) => {
      names.push(name);
      rl.question('Enter your student number: ', (studentNumber) => {
        studentNumbers.push(studentNumber);
        rl.question('Enter your faculty: ', (faculty) => {
          faculties.push(faculty);

          // Konfirmasi user apakah ingin menambahkan data lain
          rl.question('Do you want to add more data? (y/n): ', (response) => {
            if (response.toLowerCase() === 'y') {
              // Jika user menginput 'y', user akan dimintai data lagi
              askData();
            } else if (response.toLowerCase() === 'n') {
              // Jika user mengniput 'n', fungsi callback akan dipanggil dengan input yang telah diterima
              callback({ names, studentNumbers, faculties });
            } else {
              // Jika user menginput selain 'y' atau 'n'
              console.log('Invalid response. Please enter "y" or "n".');
              askData();
            }
          });
        });
      });
    });
  }

  // Meminta Data
  askData();
}

// Fngsi untuk menjalankan CLI program
function runCLI() {
  console.log('Welcome to the CLI program!');

  // Mengumpulkan input dari user
  collectInput((inputData) => {
    // Menampilkan data
    console.log('\nData:');
    for (let i = 0; i < inputData.names.length; i++) {
      console.log(`${i + 1}. ${inputData.names[i]} | ${inputData.studentNumbers[i]} | ${inputData.faculties[i]}`);
    }

    // Menutup readline interface
    rl.close();
  });
}

// Run CLI program
runCLI();
