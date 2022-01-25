import React from "react";
import { Container, Chart } from "./styled";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const Graph = (props) => {
  console.log(props);
  const allPersons = props.allPerson;
  console.log(allPersons);
  const allDates = allPersons.map((per) =>
    new Date(per.createdAt).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  );
  console.log(allDates);
  var uniqueDates = new Map();
  allDates.forEach((dt) => {
    if (uniqueDates.has(dt)) {
      return uniqueDates.set(dt, {
        count: uniqueDates.get(dt).count + 1,
        date: dt,
      });
    } else {
      return uniqueDates.set(dt, {
        count: 1,
        date: dt,
      });
    }
  });
  console.log(uniqueDates);
  const allUniqueDates = [...uniqueDates.values()];
  console.log(allUniqueDates);
  return (
    <Container>
      <Chart>
        <LineChart width={600} height={300} data={allUniqueDates}>
          <Line type="monotone" dataKey="count" stroke="#fff" />
          <CartesianGrid stroke="#fff" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis dataKey="count" />
        </LineChart>
      </Chart>
    </Container>
  );
};

export default Graph;
