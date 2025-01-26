import Cast from '../models/Cast.js';
import Movie from '../models/Movie.js';

export default {
    getAll() {
        return Cast.find({});
    },
    async create(castData) {
        return await Cast.create(castData);
    },
    async attach(movieId, castId) {
        const movie = await Movie.findById(movieId);
        console.log(movie);
        movie.casts.push(castId);
        await movie.save();

        return movie;
    }
}