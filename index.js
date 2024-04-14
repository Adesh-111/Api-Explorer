import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/joke", async (req, res) => {
    const result = await axios.get("https://v2.jokeapi.dev/joke/Any");
    res.render("joke.ejs", { jokeQues: result.data.setup, jokeAns: result.data.delivery });
});

app.get("/bored", async (req, res) => {
    const result = await axios.get("https://bored-api.appbrewery.com/random");
    res.render("bored.ejs", {
        activity: result.data.activity,
        participants: result.data.participants,
        duration: result.data.duration,
        type: result.data.type,
    });
});

app.get("/gender", (req, res) => {
    res.render("genderize.ejs");
});

app.post("/gender", async (req, res) => {
    try {
        const fname = req.body.name;
        const result = await axios.get(`https://api.genderize.io?name=${fname}`);
        res.render("genderize.ejs", {
            name: result.data.name,
            gender: result.data.gender,
            probability: result.data.probability,
        });
    } catch (error) {
        console.error("Failed");
    }
});

app.get("/number", (req, res) => {
    res.render("number.ejs");
});

app.post("/number", async (req, res) => {
    try {
        const num = req.body.number;
        const result = await axios.get(`http://numbersapi.com/${num}`);
        res.render("number.ejs", {
            content: result.data,
        });
    } catch (error) {
        console.error("Failed");
    }
});

app.get("/got", (req, res) => {
    res.render("got.ejs");
});

app.post("/got", async (req, res) => {
    try {
        const characterNumber = req.body.character;
        const result = await axios.get(`https://anapioficeandfire.com/api/characters/${characterNumber}`);
        res.render("got.ejs", {
            name: result.data.name,
            gender: result.data.gender,
            title: result.data.titles[0],
            culture: result.data.culture,
        });
    } catch (error) {
        console.error("Failed");
    }
});



app.get("/lorem", (req, res) => {
    res.render("lorem.ejs");
});

app.listen(port, () => {
    console.log("Server is running in 3000");
});