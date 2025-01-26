import Movie from '../models/Movie.js';
import showRatingHelper from '../helpers/rating-helper.js';

export default {
    getAll(filter = {}) {
        const query = {};
    
        if (filter.search) {
            query.title = { $regex: filter.search, $options: 'i' };
        }
    
        if (filter.genre) {
            query.genre = { $regex: `^${filter.genre}$`, $options: 'i' };
        }
    
        if (filter.year) {
            query.year = Number(filter.year);
        }
    
        return Movie.find(query);
    },
    async findMovie(movieId) {
        try {
            const result = await Movie.findById(movieId).populate('casts').lean();
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