const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: "1mb"}));

app.get("/", (req,res) => {
    res.status(200).send("Hello world!!");
})


const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`listening on port ${port}...`));