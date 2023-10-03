import betSchema from "@/schemas/bets.schema";
import participantSchema from "@/schemas/participants.schema";

describe("createBetsSchema", () => {
  const generateValidInput = () => ({
        homeTeamScore: 1,
        awayTeamScore: 2,
        amountBet: 1000,
        gameId: 1,
        participantId: 1
  });

    describe("when homeTeamScore is not valid", () => {
        it("should return error if homeTeamScore is not present", () => {
        const input = generateValidInput();
        delete input.homeTeamScore;

        const { error } = betSchema.validate(input);

        expect(error).toBeDefined();
        });

    })

    describe("when awayTeamScore is not valid", () => {
        it("should return error if awayTeamScore is not present", () => {
          const input = generateValidInput();
          delete input.awayTeamScore;
    
          const { error } = betSchema.validate(input);
    
          expect(error).toBeDefined();
        });
    })
})