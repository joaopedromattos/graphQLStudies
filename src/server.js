const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const results = [];

fs.createReadStream("MOCK_DATA.csv")
  .pipe(csv())
  .on("data", data => {
    console.log("Parsing our csv mock data...");
    results.push(data);
  })
  .on("end", () => {
    console.log("Parsing ended...");
  });

const app = express();

app.listen(3000, () => console.log("Listening in 3000 :)"));
