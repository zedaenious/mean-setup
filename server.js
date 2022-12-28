const express = require('express');
const cors = require('cors');
const db = require('./app/models');

const app = express();

const corsOptions = {
    origin: 'http://localhost:8080'
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.mongoose
    .connect(db.url, {})
    .then(console.log('Connected to the database'))
    .catch(err => {
        console.log('Cannot connect to the database', err);
        process.exit();
    });

app.get('/', (req, res) => {
    res.json({ message: 'Welcome mortal, Express app listening on this port' });
});

const PORT = process.env.PRO || 8080;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));