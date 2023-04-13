class ParticipantsController {
  constructor(db) {
    this.db = db;
  }
  joinUser = async (req, res) => {};
  getParticipants = async (_, res) => {
    try {
      const participants = await this.db.findAllParticipants();
      res.send(participants);
    } catch (err) {
      res.sendStatus(500);
    }
  };
}

export default ParticipantsController;
