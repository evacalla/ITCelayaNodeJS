const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 8080);

app.use(express.json());

app.use(require('./routes/movieRoute'));
app.use(require('./routes/userRoute'));
app.use(require('./routes/functions'));
app.use(require('./routes/tickets'))

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);  
});