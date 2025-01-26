import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path from 'path';
import Movie from '../models/Movie.js';
import showRatingHelper from '../helpers/rating-helper.js';

export default {
    getAll(filter = {}) {
        let result = Movie.find({});

        if (filter.search) {
            result = result.find({title: filter.search});
        }

        if (filter.genre) {
            result = result.find({genre: filter.genre});
        }

        if (filter.year) {
            result = result.find({year: Number(filter.year)});
        }

        return result;
    },
    async findMovie(movieId) {
        try {
            const result = await Movie.findById(movieId).lean();
            if (result) {
                result.rating = showRatingHelper(result.rating);
                return result;
            }
            return null;
        } catch (error) {
            console.error(error);
            return null; 
        }
    },
    createMovie(movieData) {
        const newId = uuid();

        let newMovie = {
            id: newId,
            ...movieData,
            rating: showRatingHelper(movieData.rating)
        };
        
        console.log(newMovie);

        movieObj.movies.push(newMovie);

        const filePath = path.resolve('src', 'config', 'database.js');

        const updatedContent = `export default ${JSON.stringify(movieObj, null, 4)};`;

        try {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log('Database updated successfully!');
        } catch (error) {
            console.error('Failed to update database file:', error);
        }
    }
};