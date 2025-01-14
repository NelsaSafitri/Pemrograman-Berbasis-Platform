const express = require('express');
const app = express();
const PORT = 3000;

// Middleware: Logging setiap permintaan
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next(); // Lanjutkan ke middleware atau route berikutnya
};
app.use(logger);

// Middleware untuk menangani data JSON
app.use(express.json());

// Middleware untuk validasi input pada rute tertentu
const validateInput = (req, res, next) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name dan email diperlukan' });
    }
    next(); 
};

// Halaman utama
app.get('/', (req, res) => {
    res.send('<h1>Selamat datang</h1><p>Coba tambahkan <a href="/about">/about</a> pada localhost atau kirim POST request ke <code>/submit</code>.</p>');
});

// Halaman about
app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1><p>Ini adalah contoh simple Express.js contoh penggunaan middleware.</p>');
});

// Endpoint untuk menerima data (POST)
app.post('/submit', validateInput, (req, res) => {
    const { name, email } = req.body;
    res.status(200).json({ message: 'Data Sukses Diterima', data: { name, email } });
});

// Middleware untuk penanganan error 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Ada yang salah kayaknya!' });
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di : http://localhost:${PORT}`);
});