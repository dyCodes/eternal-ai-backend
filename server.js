const express = require('express');
var cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();
require('dotenv').config();

const Routes = require('./src/routes/index');

app.use(fileUpload()); // Middleware to parse file uploads
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded form data
app.use(express.json()); // Middleware to parse JSON data

app.use(cors());

// Routes
app.use('/api', Routes);
app.get('/', (req, res) => res.json([]));

// Listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`App running on port: ${PORT}`);
});
