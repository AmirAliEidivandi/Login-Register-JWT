const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
require("dotenv").config();

const userRouter = require('./routes/user.routes');

// middlewares
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(morgan("dev"));
app.use(cors());

// routes
app.use('/auth', userRouter) // http://localhost:5000/auth/signup
app.get("/", (req, res) => res.send("Hello World!"));

const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
    })
    .catch((err) => console.log(err));
