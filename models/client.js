import pkg from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { Schema, model } = pkg;

const ClientSchema = new Schema({
        clientID: {type: String},
        sessionPhotos: [{base64: {type: String, default: ''}, fileName: {type: String, default: ''}, height: {type: Number, default: 0}, width: {type: Number, default: 0}, uri: {type: String, default: ''}, isSelected: {type: Boolean, default: false}}],
        editedPhotos: [{base64: {type: String, default: ''}, label: {type: String, default: ''}, source: {type: Number, default: 0}, type: {type: String, default: ''}, dim: {type: String, default: ''}, price: {type: String, default: ''}, numberOfItems: {type: Number, default: 1}}],
        QRcodeString: {type: String, default: ''},
});

ClientSchema.plugin(uniqueValidator);

export default model('Client', ClientSchema);