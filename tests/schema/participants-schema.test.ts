import participantSchema from "@/schemas/participants.schema";
import {faker} from "@faker-js/faker";

describe("createParticipantSchema", () => {
  const generateValidInput = () => ({
    name: faker.person.fullName(),
    balance: 1000
  });

    describe("when name is not valid", () => {
        it("should return error if name is not present", () => {
        const input = generateValidInput();
        delete input.name;

        const { error } = participantSchema.validate(input);

        expect(error).toBeDefined();
        });

    })

    describe("when balance is not valid", () => {
        it("should return error if password is not present", () => {
          const input = generateValidInput();
          delete input.balance;
    
          const { error } = participantSchema.validate(input);
    
          expect(error).toBeDefined();
        });
    })
})