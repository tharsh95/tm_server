"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./src/models/db");
const router_1 = __importDefault(require("./src/router"));
const port = 3000;
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.json({ message: "Api running" });
});
app.use('/api/v1', router_1.default);
app.listen(port, () => {
    (0, db_1.connectDB)();
    return console.log(`Express is listening at http://localhost:${port}`);
});
