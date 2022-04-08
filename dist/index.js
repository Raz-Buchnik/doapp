"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = 3008;
app.get('/', function (req, res) {
    var date = new Date().toISOString();
    res.send("Welcome!!!! ".concat(date));
});
app.listen(port, function () {
    console.log("[listen on port ".concat(port, "]"));
});
