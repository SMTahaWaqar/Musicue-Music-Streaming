import express from 'express';
import bodyParser from 'body-parser';
import mongoose from'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import helmet from 'helmet';
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
// import { fileURLPath } from 'url';


// Configurations
// const __filename = fileURLPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions))

// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`))



// ATHENTICATION ROUTES
app.use("/auth", authRoutes);

// USER SONGS
app.use("/user", userRoutes);   