import express from "express";
import dotenv from "dotenv"
import router from "./presentation/controllers/orderController";
import authRoutes from "./presentation/routes/authRoutes"

   const app = express();

    dotenv.config()


    app.use(express.json());

    app.use(router);
    app.use(authRoutes)

    app.listen(3000, () => {
      console.log("The server is running on port 3000");
    });

