const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

const events = [];

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
    type Event {
      _id: ID
      title: String!
      description: String!
      price: Float!
      date: String!
    }
    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }
    type RootQuery { 
        events: [Event!]!
    }
    type RootMutation { 
        createEvent(inputEvent: EventInput): Event
    }
    schema {
        query : RootQuery
        mutation: RootMutation
    }`),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: args => {
        const event = {
          _id: Math.random().toString(),
          title: args.inputEvent.title,
          description: args.inputEvent.description,
          price: +args.inputEvent.price,
          date: new Date().toISOString()
        };
        events.push(event);
        return event;
      }
    },
    graphiql: true
  })
);

app.listen(8000);
