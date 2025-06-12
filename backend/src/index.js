import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: "100mb" }));

app.use("/api", productRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
