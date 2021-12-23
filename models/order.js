import pkg from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { Schema, model } = pkg;

const orderSchema = new Schema({
    clientID: {type: String},
    order: [{b64Image: {type: String}, label: {type: String, default: ''}, source: {type: Number, default: 0}, type: {type: String, default: ''}, dim: {type: String, default: ''}, price: {type: String, default: ''}, numberOfItems: {type: Number, default: 1}}],
    contactDetails: {method: {type: String}, contact: {type: String}},
});
orderSchema.plugin(uniqueValidator);

export default model('Order', orderSchema);