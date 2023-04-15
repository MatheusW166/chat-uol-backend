import Joi from "joi";

class ValidationAdapter {
  convertErrors = (errors) => {
    return errors?.details.map((err) => err.message) ?? [];
  };
  validateString = (string) => {
    const stringSchema = Joi.string().trim().required();
    const { error, value } = stringSchema.validate(string);
    const errorMessagesArray = this.convertErrors(error);
    return { error: errorMessagesArray, value };
  };
  validateLimit = (limit) => {
    const numberSchema = Joi.number().min(1).optional();
    const { error, value } = numberSchema.validate(limit);
    const errorMessagesArray = this.convertErrors(error);
    return { error: errorMessagesArray, value };
  };
  validateMessage = (message) => {
    const messageSchema = Joi.object({
      from: Joi.string().trim().required(),
      to: Joi.string().trim().required(),
      text: Joi.string().trim().required(),
      type: Joi.string().trim().equal("private_message", "message"),
    });
    const { error, value } = messageSchema.validate(message);
    const errorMessagesArray = this.convertErrors(error);
    return { error: errorMessagesArray, value };
  };
}

export default ValidationAdapter;
