const express = require('express');
const app = express();
const studentRouter = require("./routers/studentRouter")



app.use(express.json());
app.use('/api/students', studentRouter)


const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is running")
})