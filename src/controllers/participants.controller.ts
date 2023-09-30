import participantsService from '../services/participants.service';
import { Request, Response } from "express";

async function create(req: Request, res: Response) {
  try {
    const { name, balance } = req.body;

    const participant = await participantsService.createParticipant(name, balance);
    res.status(201).json(participant);

  } catch (error) {
    res.sendStatus(500);
  }
}

async function read(req: Request, res: Response) {
  try {
    const participants = await participantsService.getParticipants();
    res.status(200).json(participants);
  } catch (error) {
    res.sendStatus(500);
  }
}

export default {
  create,
  read,
};  
  