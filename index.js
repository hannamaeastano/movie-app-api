// [SECTION] Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

//[SECTION] Routes
const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movie");

// [SECTION] Environment Setup
const app = express();
const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// [SECTION] Database Connection
mongoose.connect(process.env.MONGODB_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => console.log("Now connected to MongoDB Atlas."));

//[SECTION] Backend Routes 
app.use("/users", userRoutes);
app.use("/movies", movieRoutes);

// [SECTION] Server Gateway Response
if (require.main === module) {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`API is now online on port ${process.env.PORT || 3000}`);
    });
}

module.exports = { app, mongoose };