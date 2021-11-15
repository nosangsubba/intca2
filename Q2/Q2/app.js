import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import multer from 'multer';

const app = express();
const __dirname = path.resolve();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: false
}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) =>{
        //console.log(file);
        const ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg'){
            return cb("File format not supported");
        }
        cb(null, Date.now() + ext);
    }
});

const upload = multer({storage: storage});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", upload.single("image"), (req, res) => {
    res.send("File Successfully Uploaded")
});

app.listen(3000 || process.env.PORT, () => {
    console.log("started at 3000");
})

