import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/route.js';
import cors from 'cors';
import qs from 'qs';
import TokenDB_model from './models/token.js'
import token_router from './routes/token_routes.js';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();


app.use(cors());
app.use(express.json({ limit: '10mb'}));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.use('/api/v1/calender', router)
app.use('/api/v1/auth', token_router)

app.get('/', (req, res) => {
   res.send("<h1>Hello World!</h1>");
})

const PORT = process.env.PORT || 8080;



// Connect MongoDB at default port 27017.
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`)))
    .catch((error) => console.log(error.message))
   




// mongoose.set() 

// app.listen(PORT, () => {
//    console.log("App Listening on ", PORT);
// });