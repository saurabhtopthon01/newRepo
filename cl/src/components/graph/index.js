import React from "react";
import { Container, Chart } from "./styled";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const Graph = (props) => {
  const allPersons = props.allPerson;
  const allDates = allPersons.map((per) =>
    new Date(per.createdAt).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  );
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
  const allUniqueDates = [...uniqueDates.values()];
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
