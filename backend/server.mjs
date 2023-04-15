import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { User } from './models/index.js';
import typeDefs from './schema/index.js';
import resolvers from './resolvers/index.js';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const allowedOrigins = [
    'http://localhost:4000',
    'http://127.0.0.1:4000',
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5500',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5500',
    'https://studio.apollographql.com',
    `${process.env.REACT_URL}`,
];
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 4000;
await mongoose.connect(process.env.MONGODB_URI);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
        const authHeader = req.headers['authorization'] || '';
        const token = authHeader ? authHeader.split(' ')[1] : '';
        let decoded = null;
        try {
            decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (error) {}
        return {
            res,
            req,
            currentUser: decoded ? await User.findById(decoded.userId) : null,
        };
    },
});

await server.start();

server.applyMiddleware({ app, cors: corsOptions });
app.listen(PORT, () =>
    console.log(
        `Server running on http://localhost:${PORT}${server.graphqlPath}`
    )
);
