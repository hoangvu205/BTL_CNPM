const express = require("express");
const app = express();
const router = require("./src/routes/api")
const PORT = 3000;
app.use("/",router);
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});