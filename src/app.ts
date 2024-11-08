import express, { Application } from "express";
import cors from "cors";
import router from "./app/router/router";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
const app: Application = express();
app.use(cors({ origin: "http://localhost:5173" , credentials :  true}));
app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Sports Facility API");
});

app.use(globalErrorHandler);

//not found api
app.use(notFound);

export default app;
