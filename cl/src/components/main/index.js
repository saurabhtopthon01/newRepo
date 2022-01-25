import React from "react";
import { Container, PersonDetail } from "./styled";

const Main = (props) => {
  const persons = props.allPerson;

  return (
    <Container>
      {persons.map((per) => {
        return (
          <PersonDetail key={per.id}>
            <div
              style={{
                width: "2rem",
                height: "2rem",
                background: "purple",
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "1rem",
              }}
            >
              {per.name[0]}
            </div>
            <div
              style={{
                width: "50%",
              }}
            >
              {per.name}
            </div>
            <div>{per.age}</div>
          </PersonDetail>
        );
      })}
    </Container>
  );
};

export default Main;
