import express from 'express';
import bodyParser from 'body-parser'
import path from 'path';
import fs from 'fs';
import os from 'os';
const app = express();

const __dirname = path.resolve();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    var num = req.body.num;
    if (num % 2 == 0) {
        fs.appendFile('res.txt', os.EOL + 'Even Number', (err) => {
            if (err) {
                throw err;
            }
        })
        res.send("Even number Entered");
    } else {
        fs.appendFile('res.txt', 'Odd Number', (err) => {
            if (err) {
                throw err;
            }
        })
        res.send("Odd number Entered");
    }
})

app.listen(3000 || process.env.PORT, () => {
    console.log("Started at 3000");
})