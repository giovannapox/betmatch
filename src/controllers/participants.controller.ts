import participantsService from '../services/participants.service';
import { Request, Response } from "express";

async function create(req: Request, res: Response) {
  const body = req.body as BodyParams
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


export type BodyParams = {};
export type UpdateBodyParams = Partial<BodyParams>;

export default {
  create,
  read,
};  
  