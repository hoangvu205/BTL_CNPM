const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
const router = require("./src/routes/api")
const PORT = 3000;
app.use(cors());
app.use("/",router);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});