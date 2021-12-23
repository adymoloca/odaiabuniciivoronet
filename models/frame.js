import pkg from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { Schema} = pkg;

const frameSchema = new Schema({
    label: {type: String, required: true, default: ''},
    source: {type: String, required: true, default: ''},
    type: {type: String, required: true, default: ''},
    dim: {type: String, required: true, default: ''},
    price: {type: String, required: true, default: ''},
});

export default frameSchema;