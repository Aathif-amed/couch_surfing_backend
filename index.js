import express from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-HEADERS",
    "X-Requested-With, Content-Type,Authorization"
  );
  next();
});

app.use(express.json({limit:'10mb'}))

app.use('/',(req,res)=>{
    return res.send("Welcome To Couch Surfing API")
})