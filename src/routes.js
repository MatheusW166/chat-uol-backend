import { Router } from "express";
import {
  messagesController,
  participantsController,
  statusController,
} from "./controllers/index.js";

const router = Router();

router.post("/participants", participantsController.joinUser);
router.get("/participants", participantsController.getParticipants);
router.post("/messages", messagesController.sendMessage);
router.get("/messages", messagesController.getMessages);
router.post("/status", statusController.refreshStatus);

// Bônus
router.delete("/messages/:id", messagesController.deleteMessage);
router.put("/messages/:id", messagesController.updateMessage);

export default router;
