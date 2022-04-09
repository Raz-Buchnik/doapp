"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    url: process.env.DATABASE_URL
});
redisClient.on('error', err => {
    console.log(`[Redis Error]:`, err);
});
redisClient.connect().then(() => {
    const app = (0, express_1.default)();
    const port = 3008;
    app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const date = new Date().toISOString();
        yield redisClient.set('foo', 'bar');
        const foo = yield redisClient.get('foo');
        res.send(`Welcome!!!! ${date}, ${process.env.TZ}, this is from redis: foo = ${foo}`);
    }));
    app.listen(port, () => {
        console.log(`[listen on port ${port}]`);
    });
}).catch(err => {
    console.log(`[couldnt connect to redis err]`, err);
});
