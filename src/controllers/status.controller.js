class StatusController {
  constructor(db) {
    this.db = db;
  }
  async refreshStatus(req, res) {}
  async deleteInactives(req, res) {}
}

export default StatusController;
