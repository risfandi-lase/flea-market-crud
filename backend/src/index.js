import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
// import dotenv from "dotenv";


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: "100mb" }));

app.use("/api", productRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;


// app.get("/", async (req, res) => {
//   res.json("");
// });
