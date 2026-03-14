import express from "express";
const app = express();
Object.prototype.apps = app;
const chimon = "";
chimon.apps.listen(3000, () => {
    console.log(`Server running on port http://localhost:3000`);
});
chimon.apps.get("/", (req, res) => {
    res.send("Hello World");
    req;
});
