import app, { init } from "@/app";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import httpStatus from "http-status";
import { createParticipant } from "../factories/participants-factory";

beforeAll(async () => {
    await init();
    await cleanDb();
});

const server = supertest(app);

describe("/participants", () => {
    it('post => should return 201 and create participant', async () => {
        const response = await server.post("/participants").send({
            name: "gioptc",
            balance: 1000
        })
        
        expect(response.status).toBe(httpStatus.CREATED)
      });

    it('post => should return 500 when body is wrong', async () => {
        const response = await server.post("/participants").send({
            name: "gioptc",
        })
        
        expect(response.status).toBe(httpStatus.INTERNAL_SERVER_ERROR)
    });

    it('post => should return 400 when initial balance is insufficient', async () => {
        const response = await server.post("/participants").send({
            name: "gioptc",
            balance: 500
        })
        
        expect(response.status).toBe(httpStatus.BAD_REQUEST)
        expect(response.text).toBe('The initial balance must be at least $10.00 (1000 cents).');
    });

    it('get => should return 200 and participants', async () => {
        const response = await server.get("/participants")
          expect(response.status).toBe(httpStatus.OK)
    });

})