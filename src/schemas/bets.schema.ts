import Joi from "joi";

const betSchema = Joi.object({
    homeTeamScore: Joi.number().required(),
	awayTeamScore: Joi.number().required(), 
	amountBet: Joi.number().required(),
	gameId: Joi.number().required(), 
	participantId: Joi.number().required()
  });
  
  export default betSchema;