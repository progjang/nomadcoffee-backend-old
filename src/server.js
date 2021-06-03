require("dotenv").config();

import {typeDefs, resolvers} from "./schema";
import {ApolloServer} from "apollo-server-express";
import express from "express";
import {getUser} from "./users/users.utils";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
    context: async({req}) => {
        return {         
            loggedinUser: await getUser(req.headers.token)
        }
    }
});

const app = express();

app.use("/static", express.static("uploads"));
server.applyMiddleware({app});

const PORT = process.env.PORT;
app.listen({port:PORT},() => console.log(`🚀 Server is running on http://localhost:${PORT}/ ✅`));