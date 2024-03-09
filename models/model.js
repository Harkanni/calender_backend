import { Schema, model } from 'mongoose';

const schema = new Schema({
   time: {
      type: 'string',
      required: true,
   },
   date: {
      type: 'string',
      required: true,
   }
}, { timestamps: true });



const DB_model = model('DB_model', schema);

export default DB_model