import express, { type Express, type Request, type Response } from 'express';

import acreditacionesRoutes from "./interface/routes/acredatacion.routes"

import cors from "cors"

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'API is running',
  });
});

app.use(express.json());
app.use(cors({
  origin:["http://localhost:3000"]
}))

app.use('/api/acreditaciones', acreditacionesRoutes);

const PORT=process.env["PORT"] || 3001
app.listen(PORT,()=>{
    console.log(`Api runnig: http://localhost:${PORT}`)
});