import app, { init } from "@/app";
import supertest from "supertest";
import httpStatus from "http-status";

beforeAll(async () => {
    await init();
});

const server = supertest(app);

describe("/health", () => {
    it('get => should return 200 and I`m okay', async () => {
        return await server.get("/health")
          .expect(httpStatus.OK)
          .expect('OK!');
      });
})

