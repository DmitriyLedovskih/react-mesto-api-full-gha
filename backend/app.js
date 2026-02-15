require("dotenv").config();
const express = require("express");
const { errors } = require("celebrate");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const error = require("./middlewares/error");
const router = require("./routes");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cors = require("./middlewares/cors");

const { PORT = 3001, DB_URL = "mongodb://localhost:27017/mestodb" } =
  process.env;

mongoose.connect(DB_URL);

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(cors);

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT);
