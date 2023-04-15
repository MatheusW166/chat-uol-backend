import db from "../adapters/db/index.js";
import validationAdapter from "../adapters/validation/index.js";

class StatusController {
  async refreshStatus(req, res) {
    const { user } = req.headers;
    const { error, value } = validationAdapter.validateString(user);
    try {
      if (error.length > 0) {
        return res.status(404).send(error);
      }
      if (!(await db.findParticipant({ name: value }))) {
        return res.status(404).send("User not found");
      }
      const { matchedCount } = await db.updateLastStatus({
        name: value,
        lastStatus: Date.now(),
      });
      if (matchedCount === 0) {
        return res.status(404).send("Something went wrong, user not found");
      }
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  }
}

export default StatusController;
