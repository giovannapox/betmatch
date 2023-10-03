import app, { init } from "@/app";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import httpStatus from "http-status";
import { createBet } from "../factories/bets-factory";
import { createParticipant } from "../factories/participants-factory";
import { createGame } from "../factories/games-factory";
import { prisma } from "@/configs";
import betsRepository from "@/repositories/bets.repository";

beforeAll(async () => {
    await init();
    await cleanDb();
});

const server = supertest(app);

describe("/bets", () => {
    it('post => should return 201', async () => {
        const participant = await createParticipant();
        const game = await createGame();

        const response = await server.post("/bets").send({
                homeTeamScore: 1,
                awayTeamScore: 2, 
                amountBet: 1000,
                gameId: game.id,
                participantId: participant.id
        })

        expect(response.status).toBe(httpStatus.CREATED)
    });

    it('post => should return 404 when participant doens`t exist', async () => {
        const game = await createGame();

        const response = await server.post("/bets").send({
                homeTeamScore: 1,
                awayTeamScore: 2, 
                amountBet: 1000,
                gameId: game.id,
                participantId: 1
        })

        expect(response.status).toBe(httpStatus.NOT_FOUND)
    });

    it('post => should return 404 when game doens`t exist', async () => {
        const participant = await createParticipant();

        const response = await server.post("/bets").send({
                homeTeamScore: 1,
                awayTeamScore: 2, 
                amountBet: 1000,
                gameId: 1,
                participantId: participant.id
        })

        expect(response.status).toBe(httpStatus.NOT_FOUND)
    });

    it('post => should return 400 when balance is insufficient to place the bet', async () => {
        const participant = await createParticipant();
        const game = await createGame();

        const response = await server.post("/bets").send({
                homeTeamScore: 1,
                awayTeamScore: 2, 
                amountBet: 3000,
                gameId: game.id,
                participantId: participant.id
        })

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
    });

    it('post => should return 409 when game has already concluded', async () => {
        const participant = await createParticipant();
        const game = await createGame();
        await prisma.game.update({
          where: { id: game.id },
          data: { isFinished: true },
        });

        const response = await server.post("/bets").send({
                homeTeamScore: 1,
                awayTeamScore: 2, 
                amountBet: 1000,
                gameId: game.id,
                participantId: participant.id
        })

        expect(response.status).toBe(httpStatus.CONFLICT)
    });

    it('should update bet status', async () => {
        const game = await createGame()
        const participant = await createParticipant()
        const bet = await createBet(game.id, participant.id);
    
        const updatedBet = await betsRepository.updateBetStatus(bet.id, 'LOST');
        expect(updatedBet.status).toBe('LOST');
    });

})