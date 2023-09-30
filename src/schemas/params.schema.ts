import Joi from "joi";

export const signInSchema = Joi.object<GenericParam>({
  id: Joi.number().required(),
});

export type GenericParam = {
  id: number;
};
    