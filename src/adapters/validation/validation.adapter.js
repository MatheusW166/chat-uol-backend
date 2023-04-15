import Joi from "joi";
import { stripHtml } from "string-strip-html";

class ValidationAdapter {
  convertErrors = (errors) => {
    return errors?.details.map((err) => err.message) ?? [];
  };
  validateObjectId = (id) => {
    const strippedId = stripHtml(id).result;
    const stringSchema = Joi.string()
      .trim()
      .pattern(/^([0-9a-f]{12}|[0-9a-f]{24})$/i);
    const { error, value } = stringSchema.validate(strippedId);
    const errorMessagesArray = this.convertErrors(error);
    return { error: errorMessagesArray, value };
  };
  validateString = (string) => {
    const strippedString = stripHtml(string).result;
    const stringSchema = Joi.string().trim().required();
    const { error, value } = stringSchema.validate(strippedString);
    const errorMessagesArray = this.convertErrors(error);
    return { error: errorMessagesArray, value };
  };
  validateLimit = (limit) => {
    const strippedLimit = limit ? stripHtml(limit).result : limit;
    const numberSchema = Joi.number().min(1).optional();
    const { error, value } = numberSchema.validate(strippedLimit);
    const errorMessagesArray = this.convertErrors(error);
    return { error: errorMessagesArray, value };
  };
  validateMessage = (message) => {
    const { from, to, text, type } = message;
    const messageSchema = Joi.object({
      from: Joi.string().trim().required(),
      to: Joi.string().trim().required(),
      text: Joi.string().trim().required(),
      type: Joi.string().trim().equal("private_message", "message"),
    });
    const { error, value } = messageSchema.validate({
      from: stripHtml(from).result,
      to: stripHtml(to).result,
      text: stripHtml(text).result,
      type: stripHtml(type).result,
    });
    const errorMessagesArray = this.convertErrors(error);
    return { error: errorMessagesArray, value };
  };
}

export default ValidationAdapter;
