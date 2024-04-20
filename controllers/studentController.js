const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./data/data.json", "utf-8"))

getAllStudents = (req, res) => {
    res.status(200).json({
        status : "successful",
        length : data.length,
        data 
    })
}

getSingleStudent = (req, res) => {
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
        data : dataById
    })
}


createStudent = (req, res) => {
    const newId = data[data.length-1].id + 1;
    const newStudent = Object.assign({id : newId }, req.body)

    data.push(newStudent);

    fs.writeFile("./data/data.json", JSON.stringify(data), (err) => {
        res.status(201).json({
            status: "successful",
            data : newStudent

        })
    })
}


updateStudent = (req, res) => {
    const id = +req.params.id;
    const dataToUpdate = data.find((el) => el.id === id);
    const index = data.indexOf(dataToUpdate);

    const updatedData = Object.assign(dataToUpdate, req.body)
    data[index] = updatedData

    fs.writeFile("./data/data.json", JSON.stringify(data), (err) => {
        res.status(201).json({
            status: "successful",
            data : updatedData

        })
    })
}

deleteStudent = (req, res) => {
    const id = +req.params.id;
    const dataToDelete = data.find((el) => el.id === id);
    const index = data.indexOf(dataToDelete);

    if(!dataToDelete){
        return  res.status(404).json({
              status : "failed",
              message: "Page not found"
          })
      }  

    data.splice(index, 1);

    fs.writeFile("./data/data.json", JSON.stringify(data), (err) => {
        res.status(201).json({
            status: "successful",
            message : "Successfully deleted"

        })
    })

}


module.exports = {
    getAllStudents,
    getSingleStudent,
    createStudent,
    updateStudent,
    deleteStudent
}