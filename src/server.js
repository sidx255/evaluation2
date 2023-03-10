const express = require('express');

const companyRouter = require('./routers/companyRouter');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/', companyRouter);

// app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
