import movieObj from '../config/database.js';

export default {
    findMovie(movieId) {
        const result = movieObj.movies.find( movie => movie.id == movieId);
        return result;
    }
};