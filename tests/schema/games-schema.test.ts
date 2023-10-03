import gamesSchema from "@/schemas/games.schema";

describe("createGamesSchema", () => {
  const generateValidInput = () => ({
    homeTeamName: "flamengo",
    awayTeamName: "santos"
  });

    describe("when homeTeamName is not valid", () => {
        it("should return error if homeTeamname is not present", () => {
        const input = generateValidInput();
        delete input.homeTeamName;

        const { error } = gamesSchema.validate(input);

        expect(error).toBeDefined();
        });

    })

    describe("when awayTeamName is not valid", () => {
        it("should return error if awayTeamName is not present", () => {
          const input = generateValidInput();
          delete input.awayTeamName;
    
          const { error } = gamesSchema.validate(input);
    
          expect(error).toBeDefined();
        });
    })
})