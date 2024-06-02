const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact } = require('./utils/contacts');

const app = express();
const port = 3000;


// gunakan ejs

app.set('view engine','ejs');

//Third-party Middleware
app.use(expressLayouts);

// Built-in middleware
app.use(express.static('publik'));


app.get('/', (req, res) => {
  const mahasiswa = [
      {
          nama: 'Ahmad iyasya',
          email: 'ahiyasya@gmail.com',
      },
      {
          nama: 'Silmi nadira',
          email: 'silmina@gmail.com',
      },
      {
          nama: 'Silmi iyasya',
          email: 'silmiiy@gmail.com',
      },
  ];
  res.render('index', {
      nama: 'Ahmad iyasya',
      title: 'Halaman Home',
      mahasiswa,
      layout: 'layouts/main-layout', // Perbaikan: layout tanpa ekstensi dan path relatif
  });
});

app.get('/about', (req, res) => {
//   res.send('Ini adalah Halaman About');
// res.sendFile('./about.html', { root: __dirname});
res.render('about', { 
  layout: 'layouts/main-layout',
  title: 'Halaman About'
  });
});

app.get('/contact', (req, res) => {
  const contacts = loadContact();
//   res.send('Ini adalah Halaman Contact');
// res.sendFile('./contact.html', { root: __dirname});
res.render('contact', { 
  layout: 'layouts/main-layout',
  title: 'Halaman Contact',
  contacts,
});
});

app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
res.render('detail', { 
  layout: 'layouts/main-layout',
  title: 'Halaman Detail Contact',
  contact,
});
});


app.use('/',(req, res) =>{
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});