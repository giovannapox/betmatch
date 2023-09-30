import Joi from "joi";

const participantSchema = Joi.object({
    name: Joi.string().required(),
    balance: Joi.number().required(),
  });
  
  export default participantSchema;