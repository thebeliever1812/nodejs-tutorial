const express = require("express");
const userRouter = require("./routes/user");
const connectMongoDb = require("./connectDb");
const { logReqRes } = require("./middlewares");

const app = express();
const PORT = 8000;

// Connect to mongoDB
connectMongoDb("mongodb://127.0.0.1:27017/node-user-app");

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
