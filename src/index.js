import express from 'express';
import handlebars from 'express-handlebars';

const app = express();

const port = 3000;

app.engine('hbs', handlebars.engine({
    extname: 'hbs', 
}));

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    if (req.url.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    }
    next();
});

app.use(express.static('src/public'));

app.set('views', './src/views');

app.get('/', (req, res) => {
    res.render('home', {layout: false});
});

app.listen(port, console.log(`The app is running on http://localhost:3000`));