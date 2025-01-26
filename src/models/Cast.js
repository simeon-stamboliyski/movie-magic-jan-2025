import { Schema, model } from "mongoose";

const CastSchema = new Schema({
    name: String,
    age: Number,
    born: String,
    imageUrl: String
});

const Cast = model('Cast', CastSchema);

export default Cast;