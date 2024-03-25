import { Schema, model } from 'mongoose';

const schema = new Schema({
   firstName: {
      type: 'string',
      required: true,
   },

   lastName: {
      type: 'string',
      required: true,
   },
   email: {
      type: 'string',
      required: true,
   },
   address: {
      type: 'string',
      required: false,
   },
   dogBreed: {
      type: 'string',
      required: true,
   },
   session: {
      type: [{
         time: {
            type: 'string',
            required: true,
         },
         date: {
            type: 'string',
            required: true,
         }
      }]
   }
}, { timestamps: true });



const DB_model = model('DB_model', schema);

export default DB_model