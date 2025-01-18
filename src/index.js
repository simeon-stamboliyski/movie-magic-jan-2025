import express from 'express';
import handlebars from 'express-handlebars';

const app = express();

const port = 3000;

app.engine('hbs', handlebars.engine({
    extname: 'hbs', 
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.send('It works!');
});

app.listen(port, console.log(`The app is running on http://localhost:3000`));