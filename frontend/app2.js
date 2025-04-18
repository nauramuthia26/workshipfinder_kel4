const express = require('express');
const bodyParser = require('body-parser');
const kontakRoutes = require('./routes/kontakRoutes');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', kontakRoutes);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
