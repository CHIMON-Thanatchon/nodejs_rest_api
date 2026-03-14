import express from "express";
import type { Request, Response } from "express";     // เราต้อง Import  'type' { Req , Res } from ... ; 
const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
    req
});

app.listen(3000, () => {
    console.log(`Server running on port http://localhost:3000`);
});