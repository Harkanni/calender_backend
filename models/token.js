import mongoose from "mongoose";

const schema = new mongoose.Schema({
   access_token: {
      type: 'string',
      required: true,
   },

   token_type: {
      type: 'string',
      required: true,
   },
   expires_in: {
      type: 'string',
      required: true,
   },
   refresh_token: {
      type: 'string',
      required: false,
   },
   scope: {
      type: 'string',
      required: true,
   },
   userType: {
      type: 'string',
      required: true,
   },
   companyId: {
      type: 'string',
      required: false,
   },
   locationId: {
      type: 'string',
      required: false,
   },
   userId: {
      type: 'string',
      required: false,
   }
}, { timestamps: true });



const TokenDB_model = mongoose.model('TokenDB_model', schema);

export default TokenDB_model