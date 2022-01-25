import React, { useState, useEffect } from "react";
import Graph from "./components/graph";
import Main from "./components/main";
import baseURL from "./components/devprourl";
import axios from "axios";

const App = () => {
  const [showGraph, setShowGraph] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [person, setPerson] = useState({
    name: "",
    age: 0,
  });
  const [allPerson, setAllPerson] = useState([]);
  const handleSubmit = async () => {
    await axios
      .post(`${baseURL}post`, {
        name: person.name,
        age: person.age,
      })
      .then((res) => {
        const { data } = res;
        allPerson.push({
          name: data.name,
          age: data.age,
          _id: data._id,
          __v: data.__v,
          createdAt: data.createdAt,
          id: data.id,
        });
        setPerson({ name: "", age: 0 });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const getPersons = async () => {
      setShowLoading(true);
      await axios
        .get(`${baseURL}get`)
        .then((res) => {
          setAllPerson(res.data);
        })
        .catch((err) => console.log(err));
      setShowLoading(false);
    };
    getPersons();
  }, [setPerson]);
  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        marginTop: "2rem",
      }}
    >
      <button
        onClick={() => setShowGraph(!showGraph)}
        style={{
          background: "none",
          border: "1px solid white",
          color: "white",
          borderRadius: "0.5rem",
          height: "2rem",
          width: "7rem",
          marginBottom: "1.5rem",
        }}
      >
        {showGraph ? "Hide Graph" : "Show Graph"}
      </button>
      <div
        style={{
          display: "flex",
        }}
      >
        {showGraph ? (
          <Graph allPerson={allPerson} />
        ) : (
          <>
            {showLoading ? (
              <div
                style={{
                  width: "40%",
                }}
              >
                Loading...
              </div>
            ) : (
              <Main allPerson={allPerson} />
            )}
            <div>
              <div>
                <input
                  name="name"
                  type="text"
                  value={person.name}
                  onChange={(e) =>
                    setPerson({ ...person, name: e.target.value })
                  }
                  style={{
                    width: "100%",
                    height: "2rem",
                    background: "none",
                    color: "white",
                    border: "1px solid",
                    borderRadius: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                />
                <input
                  name="age"
                  type="number"
                  value={person.age === 0 ? "" : person.age}
                  required
                  onChange={(e) =>
                    setPerson({ ...person, age: e.target.value })
                  }
                  style={{
                    width: "100%",
                    height: "2rem",
                    background: "none",
                    color: "white",
                    border: "1px solid",
                    borderRadius: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                />
              </div>
              <button
                style={{
                  background: "none",
                  border: "1px solid white",
                  color: "white",
                  borderRadius: "0.5rem",
                  height: "2rem",
                  width: "7rem",
                }}
                onClick={() => handleSubmit()}
              >
                Add Person
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
