import pkg from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { Schema, model } = pkg;

const adminSchema = new Schema({
        adminID: {type: String, default: 'Admin'},
});

adminSchema.plugin(uniqueValidator);

export default model('Admin', adminSchema);