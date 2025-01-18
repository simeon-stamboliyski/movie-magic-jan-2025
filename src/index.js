import express from 'express';
import handlebars from 'express-handlebars';
import router from './routes.js';

const app = express();

const port = 3000;

app.engine('hbs', handlebars.engine({
    extname: 'hbs', 
}));

app.set('view engine', 'hbs');

app.use(express.static('src/public'));

app.set('views', './src/views');

app.use(router);

app.listen(port, console.log(`The app is running on http://localhost:3000`));