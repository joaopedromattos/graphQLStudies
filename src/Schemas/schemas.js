const types = `type User {
    id: ID!
    first_name: String
    last_name: String
    email: String!
    gender: String
    ip_address: String
    country: String
    moto: String
}

type Query {
    users: [User!]!
    user(id: ID!): User
}

type Mutation {
    createUser(first_name: String!, email: String!): User
}
`;
module.exports = types;
