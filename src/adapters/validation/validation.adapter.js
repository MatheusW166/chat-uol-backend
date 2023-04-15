import Joi from "joi";
import { stripHtml } from "string-strip-html";

class ValidationAdapter {
  convertErrors = (errors) => {
    return errors?.details.map((err) => err.message) ?? [];
  };
  validateObjectId = (id) => {
    const stringSchema = Joi.string()
      .trim()
      .pattern(/^([0-9a-f]{12}|[0-9a-f]{24})$/i);
    const { error, value } = stringSchema.validate(id);
    const errorMessagesArray = this.convertErrors(error);
    return { error: errorMessagesArray, value };
  };
  validateString = (string) => {
    const stringSchema = Joi.string().trim().required();
    const { error, value } = stringSchema.validate(string);
    const errorMessagesArray = this.convertErrors(error);
    return { error: errorMessagesArray, value: stripHtml(`${value}`).result };
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
    return {
      error: errorMessagesArray,
      value: {
        from: stripHtml(`${value.from}`).result,
        to: stripHtml(`${value.to}`).result,
        text: stripHtml(`${value.text}`).result,
        type: stripHtml(`${value.type}`).result,
      },
    };
  };
}

export default ValidationAdapter;
