import { Router } from "express";
import { participantsController } from "./controllers/index.js";

const router = Router();

router.post("/participants", (_, res) => res.send("Hello"));
router.get("/participants", participantsController.getParticipants);
router.post("/messages", (req, res) => res.send("Hello"));
router.get("/messages", (req, res) => res.send("Hello"));
router.post("/status", (req, res) => res.send("Hello"));

// Bônus
router.delete("/messages/:id", (req, res) => res.send("Hello"));
router.put("/messages/:id", (req, res) => res.send("Hello"));

export default router;
