import express from 'express';
import handlebars from 'express-handlebars';
import router from './routes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const app = express();

const port = 3000;

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));

app.set('views',  __dirname + '/views');

app.use(router);

app.listen(port, console.log(`The app is running on http://localhost:3000`));