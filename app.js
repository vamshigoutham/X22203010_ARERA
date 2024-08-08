import express from 'express';
import bodyParser from 'body-parser';
import areraRoute from './src/routes/areraRoute.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/arera', areraRoute);

app.listen(port, () => {
    console.log(`ARERA API is running on http://localhost:${port}`);
});
