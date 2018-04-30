const express = require('express');
const express_graphql = require('express-graphql');  // Middleware
const { buildSchema } = require('graphql');  // Used to build the schema
const coursesData = require('./coursesData');  // Made up data

// Graphql schema
// This is where the data is define (fields, arguments, and result types). 
// This uses graphql's schema language.
// The ! means the parameter must have a value
const schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    }
    type Course {
        id: Int!
        title: String
        author: String
        description: String
        topic: String
        url: String
        ratings: [Rating]
    }
    type Rating {
        id: Int!
        rating: Int
        date: String
    }
`);

// Resolver functions
const getCourse = function( arg ){
    return coursesData.filter(course => course.id == arg.id)[0]
}

const getCourses = function( arg ){
    return arg.topic 
           ? coursesData.filter(course => course.topic.toLowerCase() === arg.topic.toLowerCase())
           : courseData;
}

// Resolver
// This is where functions are attached to the schema fields. This is needed so the API can respond to queries.
// Resolvers don't have to be in one object also. They can be modularized.
const rootResolver = {  // Also called resolverMap (apollographql.com)
   course: getCourse,
   courses: getCourses
};

// server
const app = express();

// graphql endpoint for Graphiql
// Graphiql is an in browser IDE for graphql. It renders to the UI. (localhost:3000/graphql)
app.use('/graphql', express_graphql({
   schema: schema,
   rootValue: rootResolver,
   graphiql: true
}));

const port = 3000;
app.listen(port, () => console.log(`Listening on port: ${port}`));

