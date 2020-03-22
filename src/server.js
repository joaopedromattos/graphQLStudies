const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
const types = require("./Schemas/schemas.js");

const results = [];

var schema = buildSchema(types);

var root = {
    users: () => results,
    user: params => results.filter(user => user.id === params.id)[0],
    createUser: ({ first_name, email }) =>
        results.push({ first_name: first_name, email: email })
};

fs.createReadStream("MOCK_DATA.csv")
    .pipe(csv())
    .on("data", data => {
        results.push(data);
    })
    .on("end", () => {
        console.log("Parsing ended...");
    });

const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
);

app.listen(3000, () => console.log("Listening in 3000 :)"));
