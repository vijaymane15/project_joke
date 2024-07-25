import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", async (req,res)=>{
    try{
        const result = await axios.get("https://v2.jokeapi.dev/joke/Any?format=txt");
        console.log(result.data);
        const joke = result.data;
        res.render("index.ejs",{data:joke, error:null,});
    }catch(error){
        res.render("index.ejs",{
            data:null,
            error: error.message,
        });
    }
});

app.post("/", async (req, res)=>{
    try{
        const category = req.body.category;
        const type = req.body.type;
        const flags = req.body.flags;
        // console.log("Flags input:", flags);
        let result;
        if(flags==="none"){
            result = await axios.get(`https://v2.jokeapi.dev/joke/${category}?format=txt&type=${type}`);  
        } else {
            result = await axios.get(`https://v2.jokeapi.dev/joke/${category}?blacklistFlags=${flags}&format=txt&type=${type}`);
        }
        // console.log(result.data)
        const joke  = result.data;
        res.render("index.ejs",{
            data:joke,
            error: null,
        });
    }catch(error){
        res.render("index.ejs",{
            data: null,
            error: "No joke Found",
        });
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})