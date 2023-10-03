import app, { init } from "@/app";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import httpStatus from "http-status";
import { createGame } from "../factories/games-factory";
import { prisma } from "@/configs";
import { Bet } from "@prisma/client";
import { createParticipant } from "../factories/participants-factory";
import { createBet, createBet2 } from "../factories/bets-factory";

beforeAll(async () => {
    await init();
    await cleanDb();
});

const server = supertest(app);

describe("/games", () => {
    it('post => should return 201 when create game', async () => {
        const response = await server.post("/games").send({
          homeTeamName: "flamengo",
	        awayTeamName: "santos"
        })

        expect(response.status).toBe(httpStatus.CREATED)
    });

    it('post => should return 500 when body is wrong', async () => {
        const response = await server.post("/games").send({
          homeTeamName: "flamengo",
	        awayTeamName: 1
        })

        expect(response.status).toBe(httpStatus.INTERNAL_SERVER_ERROR)
    });

    it('get => should return 200 and games', async () => {
        const response = await server.get("/games")

        expect(response.status).toBe(httpStatus.OK)
    });

    it('get/id => should return 404 and when id is invalid', async () => {
        const response = await server.get("/games/1")

        expect(response.status).toBe(httpStatus.NOT_FOUND)
    });

    it('get/id => should return 200 and when id is valid', async () => {
        const game = await createGame()
        const response = await server.get(`/games/${game.id}`)

        expect(response.status).toBe(httpStatus.OK)
    });

    it('POST /games/:id/finish => should return 409 when trying to finish an already finished game', async () => {
        const game = await createGame();
        await prisma.game.update({
          where: { id: game.id },
          data: { isFinished: true },
        });
        
        const response = await server.post(`/games/${game.id}/finish`).send({
          homeTeamScore: 2,
          awayTeamScore: 1,
        });
        
        expect(response.status).toBe(httpStatus.CONFLICT);
      });

      it('POST /games/:id/finish => should return 404 when given an invalid game ID', async () => {

        const response = await server.post(`/games/1/finish`).send({
          homeTeamScore: 2,
          awayTeamScore: 1,
        });

        expect(response.status).toBe(httpStatus.NOT_FOUND);
      });

      it('POST /games/:id/finish => should successfully finish a game', async () => {
        const participant = await createParticipant()
        const game = await createGame();
        const amountBet = 500;
        const bet = await createBet2(game.id, participant.id, amountBet, game.homeTeamScore, game.awayTeamScore)
        
        const amountWon = calculateAmountBet(amountBet, [bet]);
          
        const response = await server.post(`/games/${game.id}/finish`).send({
          homeTeamScore: game.homeTeamScore,
          awayTeamScore: game.awayTeamScore,
        });

        expect(response.status).toBe(httpStatus.CREATED);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              homeTeamScore: game.homeTeamScore,
              awayTeamScore: game.awayTeamScore,
              amountBet: bet.amountBet,
              gameId: game.id,
              participantId: participant.id,
              status: 'WON',
              amountWon: amountWon,
            }),
          ])
        );
      });
})

export function calculateAmountBet(amountBet: number, bets: Bet[]) {
  const betsAmount = bets.reduce((acc, bet) => (acc += bet.amountBet),0);
 
  const amountWon = (amountBet / betsAmount) * betsAmount * (1 - 0.3);

  return amountWon;
}