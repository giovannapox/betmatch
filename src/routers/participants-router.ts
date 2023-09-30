import { Router } from "express";
import participantsController from "../controllers/participants.controller";


const participantsRouter = Router();

participantsRouter
    .get("/participants", participantsController.read)
    .post("/participants", participantsController.create);


export { participantsRouter };    
