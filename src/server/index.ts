import express from 'express';
import { remultExpress } from 'remult/remult-express';
import '../model/User';

let app = express();
app.use(remultExpress());

app.listen(3002, () => console.log("Server started"));