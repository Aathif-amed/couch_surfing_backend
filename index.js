import express from "express";
import dotenv from "dotenv";
import roomRoute from "./routes/roomRoute.js";
import connection from "./utils/db.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  );
  next();
});
app.use(express.json({ limit: "10mb" }));

app.use("/api/room", roomRoute);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  return res.send("Welcome To Couch Surfing API");
});
app.use((req, res) => {
  return res.status(404).json({ success: false, message: "Not Found" });
});

const startServer= async()=>{
  try {
    connection();
    app.listen(port, () => {
      console.log(`Server is listening on port:${port}`);
    });
  } catch (error) {
    
  }
}
startServer();
