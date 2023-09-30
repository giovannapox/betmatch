import Joi from "joi";

const gamesSchema = Joi.object({
    homeTeamName: Joi.string().required(),
    awayTeamName: Joi.string().required(),
  });
  
  export default gamesSchema;