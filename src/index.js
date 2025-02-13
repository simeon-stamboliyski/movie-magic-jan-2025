import express from 'express';
import handlebars from 'express-handlebars';
import router from './routes.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { authMiddleWare, checkLoggedIn } from './middlewares/auth-middleware.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const app = express();

try {
    const uri = 'mongodb://localhost:27017/magic-movies';
    await mongoose.connect(uri);
    console.log('DB accessed successfully!');

} catch (err) {
    console.log('Cannot connect to DB');
    console.log(err.message);
}

const port = 3000;

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleWare);
app.use(checkLoggedIn);

app.set('views',  __dirname + '/views');

app.use(router);

app.listen(port, console.log(`The app is running on http://localhost:3000`));