const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

const personInfo = require("./userModel/person.modal");

app.get("/get", async (req, res) => {
  try {
    const allPersons = await personInfo.find({});
    res.send(allPersons);
  } catch (error) {
    console.log("error", error);
  }
});

app.post("/post", async (req, res) => {
  const { name, age } = req.body;

  console.log(name, age);
  if (name && age) {
    const person = {
      id: Date.now(),
      name: name,
      age: age,
      createdAt: new Date(),
    };
    const newPerson = new personInfo(person);

    await newPerson
      .save()
      .then((re) => {
        console.log("re", re);
        res.send(re);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  } else {
    res.send("Data is invalid");
  }
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  console.log(id);
  if (id) {
    personInfo.findOneAndRemove({ id }, (err, person) => {
      if (err || !person) {
        console.log(err);
        res.status(404).send({
          error: "Some error occurred or Person detail is not found",
        });
        throw err;
      } else {
        console.log("person", person);
        res.status(200).send("Person Detail is deleted");
      }
    });
  } else {
    res.send("id is invalid");
  }
});

app.listen(port, () => {
  console.log(`app is running ${port}`);
});
