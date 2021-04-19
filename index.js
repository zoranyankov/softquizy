const express = require('express');
const path = require('path');

const app = express();
const routes = require('./routes');
const config = require('./config/config');
const cors = require('cors');

const errorHandler = require('./middlewares/errorHandler');

require('./config/express')(app);
require('./config/mongoose.js')();

app.use(cors());
// app.use(express.static(path.join(__dirname, "./build")));
app.use(routes);
// app.get("*", (req, res) => res.sendFile(path.join(__dirname, "./build/index.html")));
app.use(errorHandler());

app.listen(config.PORT, () => console.log(`Server is listening on http://localhost:${config.PORT}/...`));