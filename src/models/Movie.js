import { Schema, model, Types } from 'mongoose';

const MovieSchema = new Schema({
    title: String,
    category: String,
    genre: String,
    director: String,
    year: Number,
    imageUrl: String,
    rating: Number,
    description: String,
    casts: [{ 
        type: Types.ObjectId,
        ref: 'Cast'
    }]
});

const Movie = model('Movie', MovieSchema);

export default Movie;