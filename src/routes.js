import { Router } from "express";

const router = Router();

router.post("/participants", (req, res) => res.send("Hello"));
router.get("/participants", (req, res) => res.send("Hello"));
router.post("/messages", (req, res) => res.send("Hello"));
router.get("/messages", (req, res) => res.send("Hello"));
router.post("/status", (req, res) => res.send("Hello"));

// Bônus
router.delete("/messages/:id", (req, res) => res.send("Hello"));
router.put("/messages/:id", (req, res) => res.send("Hello"));

export default router;
