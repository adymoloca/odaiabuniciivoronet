import pkg from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { Schema, model } = pkg;

const ClientSchema = new Schema({
        clientID: {type: String},
        sessionPhotos: [{base64: {type: String, default: ''}, fileName: {type: String, default: ''}, height: {type: Number, default: 0}, width: {type: Number, default: 0}, uri: {type: String, default: ''}, isSelected: {type: Boolean, default: false}}],
        editedPhotos: [{base64: {type: String, default: ''}, label: {type: String, default: ''}, type: {type: String, default: ''}, dim: {type: String, default: ''}, price: {type: Number, default: 10}, numberOfItems: {type: Number, default: 1}}],
});

ClientSchema.plugin(uniqueValidator);

export default model('Client', ClientSchema);