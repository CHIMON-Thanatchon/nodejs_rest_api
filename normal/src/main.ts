import express from "express";
import type { Request, Response } from "express";     // เราต้อง Import  'type' { Req , Res } from ... ; 
const app = express();

app.use(express.json());

app.post('/user', (req: Request, res: Response) => {   // นำ Type มาระบุ Parameter
    console.log(req.body)   // ถ้าไม่มี express.json() บรรทัดนี้จะกลายเป็น undefined  
    res.send(`I've received the information.`)
})

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
    req
});

app.listen(3000, () => {
    console.log(`Server running on port http://localhost:3000`);
});