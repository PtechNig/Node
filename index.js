const express = require('express');
const app = express();
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./data/data.json", "utf-8"))

app.use(express.json());


app.get("/api/students", (req, res) => {
    res.status(200).json({
        status : "successful",
        length : data.length,
        data 
    })
})

app.get("/api/students/:id", (req, res) => {
    const id = +req.params.id;
    const dataById = data.find((el) => el.id === id);

    if(!dataById){
      return  res.status(404).json({
            status : "failed",
            message: "Page not found"
        })
    }

    res.status(200).json({
        status: "successful",
        data : {
            data : dataById
        }
    })
})

app.post("/api/students", (req, res) => {
    const newId = data[data.length-1].id + 1;
    const newStudent = Object.assign({id : newId }, req.body)

    data.push(newStudent);
    // console.log(data);
    fs.writeFile("./data/data.json", JSON.stringify(data), (err) => {
            res.status(201).json({
                status: "successful",
                data : newStudent

            })
    })
})

app.delete("/api/students/:id", (req, res) => {
    const id = +req.params.id;
    const dataById = data.find((el) => el.id === id);
    const index = data.indexOf(dataById);

    data.splice(index, 1);

    res.send("Data deleted successfully")

})


const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is running")
})