import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
import cors from "cors";
import questionRouter from "./routes/question.route"; //add by shmuel
import classRouter from "./routes/class.route";

dotenv.config();

const app = express();
app.use(express.json()); //takes the req.body to json
app.use(cors({ origin: "*" })); 

app.use("/user", userRouter);
app.use("/question", questionRouter)   //add by shmuel
app.use('/class', classRouter)

try {
  mongoose.connect(process.env.URI!).then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `connected to mongo db and running on port ${process.env.PORT}`
      );
    });
  });
} catch (error) {
  console.log("hey something went wrong");
}
