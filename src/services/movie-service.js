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
    async createMovie(movieData) {

        let newMovie = {
            ...movieData,
            rating: showRatingHelper(movieData.rating)
        };
        
        console.log(newMovie);

        try {
            const newMovie = new Movie(movieData);
            await newMovie.save(); 
            console.log('New movie added successfully');
        } catch (error) {
            console.error('Error adding new movie:', error);
        }
    }
};