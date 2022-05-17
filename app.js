require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const Controller  = require("./Controller/apiController");
const mongoose  = require("mongoose");

//Database Connection
mongoose.connect(`mongodb+srv://itsleeparker:${process.env.DB}${process.env.DB_NAME}?retryWrites=true&w=majority`)

//Open api end point to handle requests 
app.route("/api/email")
	.post(Controller.post);

app.get("/",(req , res)=>{
		res.sendFile(`${__dirname}/index.html`);
	})

app.listen(PORT  , e=>console.log(`Server running on http://localhost:${PORT}`));